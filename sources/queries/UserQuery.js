import gql from 'graphql-tag';

export const SIGN_IN = gql`
  mutation signIn($number: Int! $pwd: String!) {
    signIn(number: $number pwd: $pwd)
  }
`;

export const ENTER_CHAT_ROOM = gql`
  mutation enterChatRoom($chatId: String!) {
    enterChatRoom(chatId: $chatId) {
      id
    }
  }
`;

export const EXIT_CHAT_ROOM = gql`
  mutation exitChatRoom($chatId: String!) {
    exitChatRoom(chatId: $chatId) {
      id
    }
  }
`;

export const FIND_MY_CHAT_LIST = gql`
  query findMyChatList {
    findMyChatList {
      id
      store {
        image
      }
      orderExpectedTime
      location
    }
  }
`;

export const CHECK_ME = gql`
  query checkMe {
    checkMe {
      id
      number
      score
      isMe
    }
  }
`;