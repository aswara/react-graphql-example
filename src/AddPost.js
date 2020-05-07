import React from 'react';
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ADD_POST = gql`
  mutation AddPost(
    $title: String
    $text: String
    ) {
    createPost( input: {
        title: $title
        text: $text
      }
    ) {
      id
      title
      text
    }
  }
`;

function AddPost({ refetch }) {
  let input;
  let inputText;

  const [addPost, { data }] = useMutation(ADD_POST);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addPost({ variables: { title: input.value, text: inputText.value } });
          input.value = '';
          inputText.value = '';
          refetch();
        }}
      >
        <div>
          <label id='title'>Title</label>
          <input
            id="title"
            ref={node => {
              input = node;
            }}
          />
        </div>
        <div>
          <label id='text'>Text</label>
          <input
            id="text"
            ref={node => {
              inputText = node;
            }}
          />
        </div>

        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}

export default AddPost