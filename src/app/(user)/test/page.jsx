"use client";
import { useState } from "react";

export default function BlogDetail({ content }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = () => {
    if (!window.speechSynthesis) {
      alert("Trình duyệt của bạn không hỗ trợ đọc giọng nói!");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(
      "xin chào, tên tôi là Nguyễn Trần Trung Quân, hướng dẫn Deploy code Nextjs lên Vercel và trỏ tên miền nhanh chóng"
    );
    utterance.lang = "vi-VN"; // hoặc "en-US" nếu là tiếng Anh
    utterance.rate = 1; // tốc độ đọc
    utterance.pitch = 1; // cao độ
    utterance.onend = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <h1>Bài viết</h1>
      <p>{content}</p>
      <button onClick={handleSpeak}>
        {isPlaying ? "⏹ Dừng lại" : "🔊 Nghe bài viết"}
      </button>
    </div>
  );
}
