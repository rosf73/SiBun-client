import gql from 'graphql-tag';

export const GET_STORE_LIST = gql`
  query getStoreList {
    getStoreList {
      id
      name
      image
    }
  }
`;