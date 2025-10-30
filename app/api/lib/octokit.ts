import { graphql } from "@octokit/graphql";
import { Octokit } from "octokit";

export const octokit = new Octokit({
  auth: process.env.GITHUB_API_KEY,
});

export const graphqlWithOctokit = graphql.defaults({
  headers: { authorization: `Bearer ${process.env.GITHUB_API_KEY}` },
});
