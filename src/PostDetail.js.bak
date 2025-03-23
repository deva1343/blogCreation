import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch("/posts.json")
      .then((response) => response.json())
      .then((posts) => {
        const foundPost = posts.find((p) => p.id === parseInt(id));
        setPost(foundPost);
      });
  }, [id]);

  if (!post) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-700 mt-4">{post.content}</p>
      <Link to="/" className="text-blue-500 mt-4 block">Back to Home</Link>
    </div>
  );
};

export default PostDetail;
