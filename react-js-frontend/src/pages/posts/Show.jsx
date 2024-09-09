import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function Show() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const { user, token } = useContext(AppContext);
  const navigate= useNavigate();

  async function getPost() {
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();

    console.log(data);
    if (res.ok) {
      setPost(data);
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  async function handleDelete(e) {
    e.preventDefault();

    if (user && user.id === post.post.user_id) {
      const res = await fetch(`/api/posts/${id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/");
      }

      console.log(data);
    }
  }

  return (
    <>
      {post ? (
        <div className="mt-4 p-4 border border-dashed border-slate-400 rounded-md">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h2 className="font-bold text-2xl">{post.post.title}</h2>
              <small className="text-xs text-slate-600">
                Created by {post.user.name} on{" "}
                {new Date(post.post.created_at).toLocaleString()}
              </small>
            </div>
          </div>
          <p>{post.post.body}</p>

          {user && user.id === post.post.user_id && (
            <div className="flex items-center justify-end gap-4">
              <Link
                to={`/posts/update/${post.post.id}`}
                className="bg-green-500 text-white text-sm rounded-lg px-3 py-1"
              >
                Update
              </Link>

              <form onSubmit={handleDelete}>
                <button className="bg-red-500 text-white text-sm rounded-lg px-3 py-1">
                  Delete
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <p className="title">Post not found!</p>
      )}
    </>
  );
}
