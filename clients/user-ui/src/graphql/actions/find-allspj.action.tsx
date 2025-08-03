"use client"
import { DocumentNode, gql } from "@apollo/client";

export const GET_ALL_SPJ: DocumentNode = gql`
  query GetAllSPJ {
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
      }
      subSurveyActivity {
        id
        name
      }
    }
  }
`;