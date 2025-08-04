import { gql, useMutation } from "@apollo/client";

export const UPDATE_JOB_LETTER_STATUS = gql`
  mutation UpdateJobLetterStatus($input: UpdateJobLetterStatusDTO!) {
    updateJobLetterStatus(input: $input) {
      id
      agreeState
      approveDate
      rejectNote
    }
  }
`;
