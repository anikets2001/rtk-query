import React, { FormEvent, useState } from "react";
import { useGetPostsQuery, useNewPostMutation } from "./redux/api";
import PostsCard from "./components/PostsCard";

const App = () => {
  const { isLoading, data } = useGetPostsQuery("");
  const [ newPost ] = useNewPostMutation();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const post: Post = {
      id: Number((Math.random() * 100).toFixed(2)),
      title,
      body,
    };

    newPost(post);
    setTitle("");
    setBody("");

  };

  return (
    <div>
      <h1>my posts</h1>

      <form onSubmit={formSubmitHandler}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <br />
        <button type="submit" style={{ margin: "16px" }}>
          {" "}
          Add{" "}
        </button>
      </form>

      {isLoading ? (
        <div>LOADING...</div>
      ) : (
        <div>
          {data?.map((i) => (
            <PostsCard key={i.id} post={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
