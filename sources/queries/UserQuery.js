import gql from 'graphql-tag';

export const SIGN_IN = gql`
  mutation signIn($number: Int! $pwd: String!) {
    signIn(number: $number pwd: $pwd)
  }
`;