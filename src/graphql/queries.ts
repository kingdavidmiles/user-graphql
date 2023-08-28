import { gql } from '@apollo/client';

export const USER_QUERY = gql`
  query users {
    users {
      id
      name
      userName
      email
    }
  }
`;

export const GET_USER = gql`
  query GetUserById($id: String!) {
    getUserById(id: $id) {
      id
      name
      userName
      email
    }
  }
`;
