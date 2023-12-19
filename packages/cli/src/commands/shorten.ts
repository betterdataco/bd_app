import { getConfig } from "@/utils/get-config";
import { getNanoid } from "@/utils/get-nanoid";
import { getShortLink } from "@/utils/get-shorten-link";
import { handleError } from "@/utils/handle-error";
import { logger } from "@/utils/logger";
import chalk from "chalk";
import { Command } from "commander";
import ora from "ora";
import prompts from "prompts";
import { z } from "zod";

const addOptionsSchema = z.object({
  url: z.string().optional(),
  key: z.string().optional()
});

export const shorten = new Command()
  .name("shorten")
  .description("Generate a shortened link")
  .argument("[url]", "URL to be shortened")
  .argument("[key]", "Optional key to customize the link", getNanoid())
  .action(async (url, key, opts) => {
    try {
      const options = addOptionsSchema.parse({ url, key, ...opts });

      await getConfig();

      let givenDetails = options;

      if (!options.url) {
        const promptsOptions = await prompts([
          {
            type: "text",
            name: "url",
            message: "Enter your Destination URL:"
          },
          {
            type: "text",
            name: "key",
            message: "Enter your Short link:",
            initial: getNanoid()
          }
        ]);

        givenDetails = promptsOptions;
      }

      const spinner = ora("Shortening URL...").start();

      if (!givenDetails.key || !givenDetails.url) {
        throw new Error("URL or key is required");
      }

      const generatedShortLink = await getShortLink({
        url: givenDetails.url,
        shortLink: givenDetails.key
      });

      spinner.succeed("Short link created!");

      logger.info("");
      logger.info(`${chalk.green(generatedShortLink)}`);
      logger.info("");
    } catch (error) {
      handleError(error);
    }
  });
