import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import AddPost from './AddPost';

function App() {
  const { loading, error, data, refetch } = useQuery(gql`
    {
      posts {
        id
        title
        text
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <AddPost
        refetch={refetch}
      />
      {
        data.posts.map(({ id, title, text }) => (
          <div 
            key={id}
            style={{
              padding: 10,
              margin: 10,
              border: '1px solid lightgray'
            }}
          >
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
        ))
      }
    </div>
    );
}

export default App;
