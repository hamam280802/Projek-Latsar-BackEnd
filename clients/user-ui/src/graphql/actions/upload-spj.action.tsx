import { gql } from '@apollo/client';
export const CREATE_SPJ = gql`
  mutation CreateSpj($input: CreateSPJDTO!, $file: Upload) {
    createSPJ(input: $input, file: $file) {
      id
      eviDocumentUrl
      submitState
    }
  }
`;