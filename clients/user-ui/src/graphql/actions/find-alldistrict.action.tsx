import { gql, useQuery } from "@apollo/client";

export const GET_ALL_DISTRICT = gql`
  query GetAllSurveyDistrict {
    getAllSurveyDistrict {
      id
      city
      name
    }
  }
`;
