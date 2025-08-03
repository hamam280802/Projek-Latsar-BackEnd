import { gql, useQuery } from "@apollo/client";

export const GET_ALL_SPJ = gql`
  query GetSPJs {
    getAllSPJ {
      id
      userId
      subSurveyActivityId
      startDate
      endDate
      submitState
      submitDate
      approveDate
      verifyNote
      eviDocumentUrl
      user {
        id
        name
        email
      }
      subSurveyActivity {
        id
        name
        description
        startDate
        endDate
        surveyActivityId
      }
    }
  }
`;