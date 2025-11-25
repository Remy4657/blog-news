"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import "easymde/dist/easymde.min.css";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { getDetailCategory, updateDetailCategory } from "@/services/admin";

const DetaiPost = ({ slug }) => {
  const router = useRouter();
  const [contentDetail, setContentDetail] = React.useState({
    id: "",
    title: "",
    img: "",
    slug: "",
  });

  useEffect(() => {
    const fetchDetailPost = async () => {
      const data = await getDetailCategory(slug);
      setContentDetail({
        id: data.id,
        title: data.title,
        slug: data.slug,
        img: data.img,
      });
    };
    fetchDetailPost();
  }, [slug]);

  const handleSubmit = async () => {
    await updateDetailCategory({
      ...contentDetail,
    });
    router.push("/admin/category");
  };
  const onChangeDetailPost = (e, fieldName) => {
    setContentDetail({ ...contentDetail, [fieldName]: e.target.value });
  };

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
          <Box>
            <IconButton
              color="primary"
              onClick={() => {
                router.push(`/admin/category`);
              }}
            >
              <KeyboardBackspaceIcon />
            </IconButton>
          </Box>

          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={contentDetail.title}
            onChange={(e) => onChangeDetailPost(e, "title")}
          />
          <TextField
            id="outlined-basic"
            label="Slug"
            variant="outlined"
            value={contentDetail.slug}
            onChange={(e) => onChangeDetailPost(e, "slug")}
          />
          <TextField
            id="outlined-basic"
            label="Image"
            variant="outlined"
            value={contentDetail.img}
            onChange={(e) => onChangeDetailPost(e, "img")}
          />

          <Button
            variant="outlined"
            sx={{ width: "100px" }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default DetaiPost;
