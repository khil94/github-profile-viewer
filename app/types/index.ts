export interface HeadItem {
  name: string;
  src: string;
}

export interface GithubUserResponse {
  incomplete_results: boolean;
  items: GithubUserItem[];
  total_count: number;
}

export interface GithubUserItem {
  id: number;
  login: string; // username
  avatar_url: string; // avatar image url
  node_id: string;
  gravatar_id: string | null;
  blog?: string;
  company?: string;
  location?: string;
  email?: string;
  bio?: string;
  name?: string;
  followers?: number;
  folliwing?: number;
  type: string;
  html_url: string; // profile url
  score: number;
  site_admin: boolean;
  user_view_type: string;
  url: string;
  repos_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  organizations_url: string;
  received_events_url: string;
  subscriptions_url: string;
  starred_url: string;
  gists_url: string;
  public_gists: number;
  public_repos: number;
}

export interface GithubContributionResponse {
  totalContributions: number;
  recentContributions: ContributionsCollection;
  languageDistribution: Record<string, number>;
  mostActiveDay: string;
  weekdayRatio: Record<string, number>;
  mostLanguage: string;
}

export interface GithubContribution {
  total: ContributionsCollection;
  recent: ContributionsCollection;
  repositories: Repo;
}

export interface ContributionsCollection {
  contributionCalendar: ContributionCalendar;
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks?: ContributionDays[];
}

export interface ContributionDays {
  contributionDays: ContibutionDay[];
}

export interface ContibutionDay {
  date: string;
  contributionCount: number;
}

export interface Repo {
  nodes: RepoNode[];
}

export interface RepoNode {
  name: string;
  languages: RepoEdges;
}
export interface RepoEdges {
  edges: RepoEdge[];
}

export interface RepoEdge {
  size: number;
  node: RepoEdgeNode;
}
export interface RepoEdgeNode {
  name: string;
}
