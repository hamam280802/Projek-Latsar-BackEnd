"use client"
import { gql } from "@apollo/client";

export const ADD_SUBSURVEY_ACTIVITY = gql`
mutation AddSubSurveyActivity($input: CreateSubSurveyActivityInput!) {
  createSubSurveyActivity(input: $input) {
    id
    name
    slug
    surveyActivityId
  }
}
`;