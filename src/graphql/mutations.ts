import { gql } from '@apollo/client';

export const ADD_USER_MUTATION = gql`
  mutation ($input: UserDto!) {
    createUser(createUserInput: $input) {
      id
      name
      email
      userName
      password
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation ($input: UpdateUserDto!) {
    updateUser(updateUserInput: $input)
  }
`;
export const DELETE_USER_MUTATION = gql`
  mutation ($deleteById: String!) {
    deleteUser(deleteUserInput: $deleteById)
  }
`;
