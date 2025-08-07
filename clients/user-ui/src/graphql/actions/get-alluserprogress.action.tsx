import { gql } from "@apollo/client";

export const GET_REAL_ALL_USER_PROGRESS = gql`
  query AllUserSurveyProgress {
    allUserSurveyProgress {
      id
      userId
      subSurveyActivityId
      totalAssigned
      submitCount
      approvedCount
      rejectedCount
      lastUpdated
      user {
        id
        name
      }
      subSurveyActivity {
        id
        name
      }
    }
  }
`;
