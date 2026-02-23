"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./loginPage.module.css";

export default function LoginPage() {
  const router = useRouter();
  // const { status } = useSession();

  // if (status === "loading") {
  //   return <div className={styles.loading}>Loading...</div>;
  // }

  // if (status === "authenticated") {
  //   router.push("/admin");
  // }

  const [username, setUsername] = useState("admin@example.com");
  const [password, setPassword] = useState("Admin@123");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Vui lòng nhập username và password.");
      return;
    }
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password }),
    });
    const data = await res.json();

    if (res.ok) {
      router.push("/admin");
    } else {
      alert(data.message);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Đăng nhập</h1>

        <form
          className={styles.form}
          onSubmit={(e) => handleSubmit(e)}
          noValidate
        >
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
