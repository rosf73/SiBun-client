import gql from 'graphql-tag';

export const NEW_ROOM = gql`
  subscription subscriptChatRoom {
    subscriptChatRoom {
      id
      location
      latitude
      longitude
      store {
        name
        image
      }
      orderExpectedTime
      boss {
        id
      }
      memberList {
        id
      }
    }
  }
`;

export const CREATE_CHAT_ROOM = gql`
  mutation createChatRoom($storeName: String! $location: String! $time: DateTime! $additionalLocation : String!) {
    createChatRoom(storeName: $storeName location: $location time: $time additionalLocation: $additionalLocation) {
      id
    }
  }
`;

export const REMOVE_CHAT_ROOM = gql`
  mutation removeChatRoom($roomId: String!) {
    removeChatRoom(roomId: $roomId) {
      id
    }
  }
`;

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
      boss {
        id
      }
      memberList {
        id
      }
    }
  }
`;

export const CHAT_INFO = gql`
  query getChatRoom($roomId: String!){
    getChatRoom(roomId: $roomId){
      store{
        image
        name
      }
      memberList{
        number
      }
      location
      orderExpectedTime
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
          number
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