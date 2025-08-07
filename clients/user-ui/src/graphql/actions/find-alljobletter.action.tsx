import { gql, useQuery } from "@apollo/client";

export const GET_ALL_JOB_LETTERS = gql`
  query GetJobLetters {
    getAllJobLetters {
      id
      userId
      subSurveyActivityId
      region
      submitDate
      agreeState
      approveDate
      rejectNote
      eviFieldUrl
      eviSTUrl
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