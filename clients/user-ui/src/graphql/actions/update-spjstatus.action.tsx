import { gql, useMutation } from '@apollo/client';

export const UPDATE_SPJ_STATUS = gql`
  mutation UpdateSPJStatus($input: UpdateSPJStatusDTO!) {
    updateSPJStatus(input: $input) {
      id
      submitState
      approveDate
      verifyNote
    }
  }
`;
