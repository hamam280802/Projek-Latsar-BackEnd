"use client"

import { DocumentNode, gql } from "@apollo/client";

export const GET_SURVEY_ACTIVITIES_BY_SLUG: DocumentNode = gql`
  query SurveyActivityBySlug($slug: String!) {
    surveyActivityBySlug(slug: $slug) {
      id
      name
      slug
    }
  }
`;
