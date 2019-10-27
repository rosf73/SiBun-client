import gql from 'graphql-tag';

export const CHAT = gql`
  query chatContent {
    chatContent {
      id
      user {
        id
      }
      chatRoom {
        id
      }
      content
    }
  }
`;

// export const ORDER = gql`

// `;