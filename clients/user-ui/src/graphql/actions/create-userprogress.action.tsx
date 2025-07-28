import { gql, useMutation } from "@apollo/client";

export const CREATE_USER_PROGRESS = gql`
  mutation CreateUserProgress($input: CreateSurveyProgressDTO!) {
    createUserProgress(input: $input) {
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