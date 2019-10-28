import gql from 'graphql-tag';

export const CHAT_CONTENT_LIST = gql`
  mutation chatContents($roomId: String!) {
    chatContents(roomId: $roomId) {
      id
      user {
        id
        number
      }
      chatRoom {
        id
      }
      content
    }
  }
`;

export const ROOM_ORDER = gql`
  mutation getRoomOrder($roomId: String!) {
    getRoomOrder(roomId: $roomId) {
      id
      individualOrderList {
        id
        user {
          id
        }
        menuList {
          name
          price
        }
      }
      state
    }
  }
`;

export const SEND_CHAT = gql`
  mutation sendChat($roomId: String! $content: String!) {
    sendChat(roomId: $roomId, content: $content)
  }
`;

export const NEW_CHAT = gql`
  subscription newChat {
    newChat {
      id
      user {
        id
        number
      }
      chatRoom {
        id
      }
      content
    }
  }
`;