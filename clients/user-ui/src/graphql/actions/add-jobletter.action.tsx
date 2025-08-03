import { gql } from "@apollo/client";

export const ADD_JOB_LETTER = gql`
mutation AddJobLetter($input: CreateJobLetterDTO!) {
  createJobLetter(input: $input) {
    userId
    subSurveyActivityId
    region
    submitDate
  }
}
`;