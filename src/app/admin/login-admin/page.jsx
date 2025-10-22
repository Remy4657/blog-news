"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./loginPage.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // setError("");

    // if (!username.trim() || !password) {
    //   setError("Vui lòng nhập username và password.");
    //   return;
    // }
    router.push("/admin");

    // TODO: gọi API đăng nhập ở đây (fetch / axios)
    console.log("submit", { username, password });
    // ví dụ redirect hoặc xử lý token...
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Đăng nhập</h1>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label className={styles.label}>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              placeholder="Nhập username"
              autoComplete="username"
              autoFocus
            />
          </label>

          <label className={styles.label}>
            Password
            <div className={styles.passwordWrapper}>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="Nhập password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.toggleBtn}
                onClick={() => setShowPass((s) => !s)}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? "Ẩn" : "Hiện"}
              </button>
            </div>
          </label>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submit}>
            Đăng nhập
          </button>
        </form>
      </div>
    </main>
  );
}
