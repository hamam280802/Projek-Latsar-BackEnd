import { gql, useMutation } from "@apollo/client";

export const UPDATE_USER_PROGRESS = gql`
  mutation UpdateUserSurveyProgress($userProgressId: String!, $input: UpdateUserProgressDTO!) {
    updateUserSurveyProgress(userProgressId: $userProgressId, input: $input) {
      id
      totalAssigned
      submitCount
      approvedCount
      rejectedCount
      lastUpdated
    }
  }
`;