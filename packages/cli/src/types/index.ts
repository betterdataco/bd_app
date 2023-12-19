export interface UserInfo {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean | null;
  image: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  usage: number;
  usageLimit: number;
  plan: string;
  stripeId: string | null;
  billingCycleStart: number;
  monitoringId: string | null;
  createdAt: Date;
  updatedAt: Date;
  domains: {
    id: string;
    slug: string;
    verified: boolean;
    target: string | null;
    type: string;
    placeholder: string | null;
    description: string | null;
    projectId: string;
    primary: boolean;
    clicks: number;
    lastClicked: Date | null;
    lastChecked: Date;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export interface Domain {
  slug: string;
  verified: boolean;
  primary: boolean;
  target: string | null;
  type: string;
  placeholder: string | null;
  clicks: number;
}

export interface DubConfig extends UserInfo {
  currentProject: Project["slug"];
  currentDomain: Project["domains"][0]["slug"];
  token: string;
}

export interface LinkOptions {
  url: string;
  shortLink?: string;
}

export interface APIResponse {
  id: string;
  domain: string;
  key: string;
  url: string;
  archived: boolean;
  expiresAt: string;
  password: string;
  proxy: boolean;
  title: string;
  description: string;
  image: string;
  rewrite: boolean;
  ios: string;
  android: string;
  geo: Record<string, unknown>;
  publicStats: boolean;
  tagId: string;
  comments: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  userId: string;
  projectId: string;
  clicks: number;
  lastClicked: string;
  createdAt: string;
  updatedAt: string;
}
