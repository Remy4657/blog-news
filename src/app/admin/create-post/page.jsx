"use client";
import { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, desc }),
    });
    if (res.ok) alert("Post created!");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tạo bài viết mới</h1>
      <input
        className="border p-2 w-full mb-4"
        placeholder="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <SimpleMDE value={desc} onChange={setDesc} />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        onClick={handleSubmit}
      >
        Đăng bài
      </button>
    </div>
  );
}
