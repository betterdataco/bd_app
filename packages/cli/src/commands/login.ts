import { DubConfig } from "@/types";
import { getUserInfo } from "@/utils/auth/get-user-info";
import { handleError } from "@/utils/handle-error";
import { logger } from "@/utils/logger";
import { getProjectsInfo } from "@/utils/projects";
import chalk from "chalk";
import { Command } from "commander";
import Configstore from "configstore";
import ora from "ora";
import { z } from "zod";

const loginOptionsSchema = z.object({
  token: z.string()
});

export const login = new Command()
  .name("login")
  .description("Configure your dub.co authorization credentials")
  .argument("<token>", "API token for authentication")
  .action(async (token) => {
    const spinner = ora("Verifying user credentials...").start();
    const options = loginOptionsSchema.parse({ token });
    try {
      const userInfo = await getUserInfo({ token: options.token });

      if (!userInfo) {
        spinner.stop();
        logger.warn(
          `Please visit ${chalk.green(
            "https://dub.co"
          )} to generate your token.`
        );
        process.exit(0);
      }

      const projectsInfo = await getProjectsInfo({ token: options.token });

      const defaultInfo = {
        currentProject: projectsInfo[0].slug ?? null,
        currentDomain: projectsInfo[0].domains[0].slug ?? null
      };

      const configInfo: DubConfig = {
        ...userInfo,
        ...defaultInfo,
        token: options.token
      };

      const config = new Configstore("dubcli");
      config.set(configInfo);

      if (!config.path) {
        spinner.stop();
        handleError(new Error("Failed to create config file."));
      }

      spinner.succeed("Done");

      logger.info("");
      logger.info(`${chalk.green("Success!")} Dub authentication completed.`);
      logger.info("");
    } catch (error) {
      spinner.stop();
      handleError(error);
    }
  });
