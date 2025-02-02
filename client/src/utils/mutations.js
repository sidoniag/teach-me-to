import gql from 'graphql-tag';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      firstName
      lastName
      displayName
      email
    }
  }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $firstName: String!, $lastName: String!, $displayName: String!, $email: String!, $password: String!) {
  addUser(username: $username, firstName: $firstName, lastName: $lastName, displayName: $displayName, email: $email, password: $password) {
    token
    user {
      _id
      username
      firstName
      lastName
      displayName
      email

      
    }
  }
}
`;

export const ADD_RESOURCE = gql`
mutation addResource($articleName: String!, $articleShortDesc : String!, $articleText: String,
    $imageList: [ImageInput], $videoList: [VideoInput]) {
      addResource(name: $articleName, shortDescription: $articleShortDesc, resourceBody: $articleText,
      images:$imageList, videos: $videoList) {
        _id
        name
        shortDescription
        displayName
        resourceBody
        dateCreated
        images{
            fileURL
            imageCaption
        }
        videos{
            fileURL
            videoCaption
        }
      }
    }
`;

export const UPDATE_RESOURCE = gql`
mutation updateResource($id: ID!, $articleName: String!, $articleShortDesc : String!, $articleText: String,
  $imageList: [ImageInput], $videoList: [VideoInput]) {
    updateResource(_id: $id, name: $articleName, shortDescription: $articleShortDesc, resourceBody: $articleText,
      images:$imageList, videos: $videoList) {
      _id
      name
      shortDescription
      displayName
      resourceBody
      dateCreated
      images{
        fileURL
        imageCaption
      }
      videos{
        fileURL
        videoCaption
      }
    }
  }
`;
