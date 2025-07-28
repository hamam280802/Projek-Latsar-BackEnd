import { gql, useMutation } from "@apollo/client";

export const UPDATE_USER_PROGRESS = gql`
  mutation UpdateUserProgress($surveyProgressId: String!, $input: UpdateSurveyProgressDTO!) {
    updateUserProgress(surveyProgressId: $surveyProgressId, input: $input) {
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