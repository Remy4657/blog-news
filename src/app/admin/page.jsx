"use client";
import Button from "@mui/material/Button";

export default function Home() {
  const handleTest = () => {
    //alert("me");
    console.log("hello");
  };
  return (
    <>
      <div>Admin Homepage</div>
      <div>Admin Homepage</div>
      <div>Admin Homepage</div>
      <div>Admin Homepage</div>
      <div>Admin Homepage</div>
      <div>Admin Homepage</div>
      <button onClick={() => handleTest()}>a</button>
      <Button onClick={handleTest}>e</Button>
    </>
  );
}
