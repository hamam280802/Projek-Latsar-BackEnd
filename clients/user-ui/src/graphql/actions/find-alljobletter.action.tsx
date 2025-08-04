import { gql, useQuery } from "@apollo/client";

export const GET_ALL_JOB_LETTERS = gql`
  query GetJobLetters {
    getAllJobLetters {
      id
      userId
      subSurveyActivityId
      region
      jobLetterState
      submitDate
      agreeState
      approveDate
      rejectNote
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