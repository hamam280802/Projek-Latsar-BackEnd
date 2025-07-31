import { gql, useMutation } from "@apollo/client";

export const CREATE_USER_PROGRESS = gql`
  mutation CreateUserSurveyProgress($input: CreateUserProgressDTO!) {
    createUserSurveyProgress(input: $input) {
      id
      userId
      subSurveyActivityId
      totalAssigned
      submitCount
      approvedCount
      rejectedCount
      lastUpdated
    }
  }
`;