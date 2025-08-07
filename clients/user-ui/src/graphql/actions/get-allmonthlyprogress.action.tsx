import { gql } from "@apollo/client";

export const GET_MONTHLY_DASHBOARD_STATS = gql`
  query GetMonthlySurveyStats {
    getMonthlySurveyStats {
      totalJobLetters
      totalSPJ
      totalActiveUsers
    }
  }
`;