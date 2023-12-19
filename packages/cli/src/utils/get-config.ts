import { DubConfig } from "@/types";
import Configstore from "configstore";

export async function getConfig() {
  const getConfig = new Configstore("dubcli");

  if (!getConfig.size) {
    throw new Error("Missing configuration. Please try to login again.");
  }

  const config = (await getConfig.all) as DubConfig;

  if (!config.currentProject) {
    throw new Error(
      "Project not found. Please visit https://dub.co to create a new project and try to login again."
    );
  }

  if (!config.currentDomain) {
    throw new Error(
      "Domain not found. Please visit https://dub.co to add a new domain and try to login again."
    );
  }

  return config;
}
