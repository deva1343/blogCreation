import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/posts.json")
      .then((response) => response.json())
      .then(setPosts);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} to={`/post/${post.id}`} className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
