import { getConfig } from "@/utils/get-config";
import { handleError } from "@/utils/handle-error";
import { logger } from "@/utils/logger";
import { getDomainsInfo, getProjectsInfo } from "@/utils/projects";
import chalk from "chalk";
import { Command } from "commander";
import Configstore from "configstore";
import colorizeJson from "json-colorizer";
import ora from "ora";
import prompts from "prompts";

export const config = new Command()
  .name("config")
  .description("see your configured dub.co credentails")
  .option("set", "update config file")
  .action(async () => {
    const spinner = ora("Getting config file...").start();

    try {
      const configInfo = await getConfig();

      spinner.succeed("Configuration file successfully retrieved.");

      logger.info("");
      console.log(
        colorizeJson(JSON.stringify(configInfo, null, 2), {
          colors: {
            STRING_KEY: "white",
            STRING_LITERAL: "#65B741",
            NUMBER_LITERAL: "#7E30E1"
          }
        })
      );
      logger.info("");
    } catch (error) {
      spinner.stop();
      handleError(error);
    }
  });

config
  .command("set")
  .description("update config file")
  .action(async () => {
    const spinner = ora("Getting config file...").start();

    try {
      const config = await getConfig();

      const showProjects = async () => {
        const projects = await getProjectsInfo({
          token: config.token
        });

        spinner.stop();

        return projects.map((projects) => ({
          title: `${projects.name} (${projects.slug})`,
          value: projects.slug
        }));
      };

      const showDomains = async () => {
        const domains = await getDomainsInfo({
          token: config.token,
          projectSlug: config.currentProject
        });

        spinner.stop();

        return domains.map((domain) => ({
          title: domain.slug,
          value: domain.slug
        }));
      };

      const options = await prompts([
        {
          type: "select",
          name: "category",
          message: "What would you like to set?",
          choices: [
            { title: "Project", value: "project" },
            { title: "Domain", value: "domain" }
          ]
        },
        {
          type: (prev: string) => (prev === "project" ? "select" : null),
          name: "project",
          message: "Choose a project:",
          choices: await showProjects()
        },
        {
          type: (prev: string) => (prev === "domain" ? "select" : null),
          name: "domain",
          message: "Select a domain from your chosen project:",
          choices: await showDomains()
        }
      ]);

      const getconfig = new Configstore("dubcli");

      switch (options.category) {
        case "project":
          getconfig.set("currentProject", options.project);
          break;
        case "domain":
          getconfig.set("currentDomain", options.domain);
          break;
        default:
          process.exit(0);
      }
      spinner.succeed("Done");

      logger.info("");
      logger.info(`${chalk.green("Success!")} Configuration updated.`);
      logger.info("");
    } catch (error) {
      spinner.stop();
      handleError(error);
    }
  });
