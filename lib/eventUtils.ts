import { GithubEventResponse } from "@/app/types";

export function eventItemGenerator(v: GithubEventResponse) {
  switch (v.type) {
    case "PushEvent":
      return `Pushed to ${v.payload.ref || ""}`;
    case "ForkEvent":
      return `Issue ${v.payload.issue.number} has ${v.payload.action}`;
    case "IssuesEvent":
      return `Watch ${v.payload.action}`;
    case "PullRequestEvent":
      return `${v.payload.action} pull request #${v.payload.number}`;
    case "PullRequestReviewEvent":
      return `${v.payload.action} pull reqeust review for #${v.payload.pull_request.number}`;
    case "ReleaseEvent":
      return `${v.payload.action} - ${v.payload.release.tag_name || ""}`;
    case "WatchEvent":
      return `Watch ${v.payload.action}`;
  }
}
