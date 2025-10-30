"use client";
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const SinglePage = async ({ params }) => {
  const { slug } = params;

  //const data = await getData(slug);
  console.log("[admin] data: ");

  const [contentDetail, setContentDetail] = React.useState({
    title: "",
    des: "",
    imgUrl: "",
  });

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box
          component="form"
          autoComplete="on"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "50%",
            margin: "auto",
          }}
        >
          <h1>Detail page</h1>

          <TextField id="outlined-basic" label="Title" variant="outlined" />

          <TextField id="outlined-basic" label="Image URL" variant="outlined" />
          <TextareaAutosize
            aria-label="minimum height"
            minRows={6}
            placeholder="Description..."
            style={{ width: "100%" }}
          />
          <Button variant="outlined" sx={{ width: "100px" }}>
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SinglePage;
