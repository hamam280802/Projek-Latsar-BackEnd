import { gql } from "@apollo/client";

export const ADD_SPJ = gql`
mutation AddSpj($input: CreateSPJDTO!) {
  createSPJ(input: $input) {
    id
    submitState
    submitDate
  }
}`;