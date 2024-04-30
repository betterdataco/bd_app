import { openApiErrorResponses } from "@/lib/openapi/responses";
import {
  DomainSchema,
  LinkSchema,
  TagSchema,
  WorkspaceSchema,
} from "@/lib/zod/schemas";
import { API_DOMAIN } from "@dub/utils";
import { createDocument } from "zod-openapi";
import { analyticsPaths } from "./analytics";
import { domainsPaths } from "./domains";
import { linksPaths } from "./links";
import { metatagsPath } from "./metatags";
import { qrCodePaths } from "./qr";
import { tagsPaths } from "./tags";
import { workspacesPaths } from "./workspaces";

export const document = createDocument({
  openapi: "3.0.3",
  info: {
    title: "dub.co API",
    description:
      "Dub is link management infrastructure for companies to create marketing campaigns, link sharing features, and referral programs.",
    version: "0.0.1",
    contact: {
      name: "dub.co Support",
      email: "support@dub.co",
      url: "https://dub.co/api",
    },
    license: {
      name: "AGPL-3.0 license",
      url: "https://github.com/dubinc/dub/blob/main/LICENSE.md",
    },
  },
  servers: [
    {
      url: API_DOMAIN,
      description: "Production API",
    },
  ],
  paths: {
    ...linksPaths,
    ...qrCodePaths,
    ...analyticsPaths,
    ...workspacesPaths,
    ...tagsPaths,
    ...domainsPaths,
    ...metatagsPath,
  },
  components: {
    schemas: {
      LinkSchema,
      WorkspaceSchema,
      TagSchema,
      DomainSchema,
    },
    securitySchemes: {
      token: {
        type: "http",
        description: "Default authentication mechanism",
        scheme: "bearer",
        "x-speakeasy-example": "DUB_API_KEY",
      },
    },
    responses: {
      ...openApiErrorResponses,
    },
  },
  "x-speakeasy-globals": {
    parameters: [
      {
        "x-speakeasy-globals-hidden": true,
        name: "workspaceId",
        in: "query",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        "x-speakeasy-globals-hidden": true,
        name: "projectSlug",
        in: "query",
        deprecated: true,
        schema: {
          type: "string",
        },
      },
    ],
  },
});
