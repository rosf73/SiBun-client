import gql from 'graphql-tag';

export const GET_CHAT_ROOM_LIST = gql`
  query getChatRoomList {
    getChatRoomList {
      id
      location
      latitude
      longitude
      store {
        name
        image
      }
      orderExpectedTime
      memberList {
        id
      }
    }
  }
`;

export const CHAT_CONTENT_LIST = gql`
  query chatContents($roomId: String!) {
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

export const GET_ROOM_ORDER = gql`
  query getRoomOrder($roomId: String!) {
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
  subscription newChat($roomId: String!) {
    newChat(roomId: $roomId) {
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