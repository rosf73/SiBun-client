import { gql } from 'apollo-boost';

export const SIGN_IN = gql`
  mutation singIn($number: Int! $pwd: String!) {
    singIn(number: $number pwd: $pwd)
  }
`;