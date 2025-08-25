// issue.actions.ts
import { gql } from "@apollo/client";

/* =========================
   Fragments
========================= */
export const ISSUE_COMMENT_FIELDS = gql`
  fragment IssueCommentFields on IssueCommentType {
    id
    message
    userId
    subSurveyActivityId
    createdAt
    user { id name email }
    subSurveyActivity { id name slug }
  }
`;

export const CONTENT_ISSUE_FIELDS = gql`
  fragment ContentIssueFields on ContentIssueType {
    id
    content
    issueStatus
    reporterId
    subSurveyActivityId
    createdAt
    updatedAt
    reporter { id name email }
    subSurveyActivity { id name slug }
    IssueComment { ...IssueCommentFields }
  }
  ${ISSUE_COMMENT_FIELDS}
`;

/* =========================
   Mutations: ContentIssue
========================= */
export const CREATE_CONTENT_ISSUE = gql`
  mutation CreateContentIssue($input: CreateContentIssueDto!) {
    createContentIssue(input: $input) {
      ...ContentIssueFields
    }
  }
  ${CONTENT_ISSUE_FIELDS}
`;

export const UPDATE_CONTENT_ISSUE = gql`
  mutation UpdateContentIssue($input: UpdateContentIssueDto!) {
    updateContentIssue(input: $input) {
      ...ContentIssueFields
    }
  }
  ${CONTENT_ISSUE_FIELDS}
`;

/* =========================
   Queries: ContentIssue
========================= */
export const CONTENT_ISSUE_BY_ID = gql`
  query ContentIssueById($id: ID!) {
    contentIssueById(id: $id) {
      ...ContentIssueFields
    }
  }
  ${CONTENT_ISSUE_FIELDS}
`;

export const CONTENT_ISSUES = gql`
  query ContentIssues(
    $subSurveyActivityId: ID
    $status: IssueStatus
    $search: String
    $skip: Int
    $take: Int
  ) {
    contentIssues(
      subSurveyActivityId: $subSurveyActivityId
      status: $status
      search: $search
      skip: $skip
      take: $take
    ) {
      ...ContentIssueFields
    }
  }
  ${CONTENT_ISSUE_FIELDS}
`;

/* =========================
   Mutations: IssueComment
========================= */
export const ADD_ISSUE_COMMENT = gql`
  mutation AddIssueComment($input: createIssueCommentDto!) {
    addIssueComment(input: $input) {
      ...IssueCommentFields
      content { id updatedAt issueStatus }
    }
  }
  ${ISSUE_COMMENT_FIELDS}
`;

export const UPDATE_ISSUE_COMMENT = gql`
  mutation UpdateIssueComment($input: updateIssueCommentDto!) {
    updateIssueComment(input: $input) {
      ...IssueCommentFields
    }
  }
  ${ISSUE_COMMENT_FIELDS}
`;

/* =========================
   Query: IssueComment by Content
========================= */
export const ISSUE_COMMENTS_BY_CONTENT = gql`
  query IssueCommentsByContent($contentId: ID!) {
    issueCommentsByContent(contentId: $contentId) {
      ...IssueCommentFields
    }
  }
  ${ISSUE_COMMENT_FIELDS}
`;
