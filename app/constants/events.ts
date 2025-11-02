import {
  CircleAlert,
  Eye,
  GitFork,
  GitMerge,
  GitPullRequest,
  LucideIcon,
  Rocket,
  SearchCheck,
} from "lucide-react";
import { GithubEvents } from "../types";

export const GITHUB_EVENTS = [
  "PushEvent",
  "PullRequestEvent",
  "IssuesEvent",
  "PullRequestReviewEvent",
  "ReleaseEvent",
  "ForkEvent",
  "WatchEvent",
] as const;

export const GithubEventsIcon: Record<GithubEvents, LucideIcon> = {
  ForkEvent: GitFork,
  IssuesEvent: CircleAlert,
  PullRequestEvent: GitPullRequest,
  PullRequestReviewEvent: SearchCheck,
  PushEvent: GitMerge,
  ReleaseEvent: Rocket,
  WatchEvent: Eye,
};
