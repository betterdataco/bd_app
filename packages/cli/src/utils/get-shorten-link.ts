import { APIResponse, LinkOptions } from "@/types";
import { getConfig } from "@/utils/get-config";
import fetch from "node-fetch";

export async function getShortLink({ url, shortLink }: LinkOptions) {
  const configInfo = await getConfig();

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${configInfo.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      domain: configInfo.currentDomain,
      url: url,
      key: shortLink
    })
  };

  try {
    const response = await fetch(
      `https://api.dub.co/links?projectSlug=${configInfo?.currentProject}`,
      options
    );

    const data = (await response.json()) as APIResponse;
    return `https://${data?.domain}/${data?.key}`;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
