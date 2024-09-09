import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const [errors, setErrors] = useState({});

  const { token } = useContext(AppContext);
  const navigate =useNavigate();

  async function handleCreate(event) {
    event.preventDefault();
    console.log(formData);

    const res = await fetch("/api/posts", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log(data);

    if(data.errors) {
        setErrors(data.errors)
    } else {
        navigate('/')
    }
  }

  return (
    <>
      <h1 className="title">Create a new post</h1>
      <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
        <div>
          <input
            type="text"
            placeholder="Post Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div>
          <textarea
            rows="6"
            placeholder="Post Content"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          ></textarea>
          {errors.body && <span className="error">{errors.body}</span>}
        </div>

        <button className="primary-btn">Create</button>
      </form>
    </>
  );
}
