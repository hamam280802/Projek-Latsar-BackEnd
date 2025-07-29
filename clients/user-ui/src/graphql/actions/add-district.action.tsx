import { gql } from "@apollo/client";

export const ADD_DISTRICT = gql`
mutation AddDistrict($input: CreateDistrictDTO!) {
  createDistrict(input: $input) {
    id
    city
    name
  }
}
`;