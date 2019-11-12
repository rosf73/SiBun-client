import gql from 'graphql-tag';

export const GET_STORE_LIST = gql`
  query getStoreList($storeCategoryName: String!) {
    getStoreList(storeCategoryName: $storeCategoryName) {
      id
      name
      image
    }
  }
`;

export const GET_MENU_LIST = gql`
  query getStoreMenu($storeName: String!) {
    getStoreMenu(storeName: $storeName) {
      id
      name
      price
    }
  }
`;