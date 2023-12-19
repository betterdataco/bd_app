import type { Domain, Project } from "@/types";
import fetch from "node-fetch";

export async function getProjectsInfo({ token }: { token: string }) {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    };

    const response = await fetch(" https://api.dub.co/projects", options);
    const parsedData = (await response.json()) as Project[];

    if (parsedData.length === 0) {
      throw new Error(
        "No projects found. Please visit https://dub.co to create a new project and try to login again. "
      );
    }

    return parsedData;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function getDomainsInfo({
  token,
  projectSlug
}: {
  token: string;
  projectSlug: string;
}) {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    };

    const response = await fetch(
      `https://api.dub.co/projects/${projectSlug}/domains`,
      options
    );
    const parsedData = (await response.json()) as Domain[];

    return parsedData;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
