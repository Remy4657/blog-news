"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

import "easymde/dist/easymde.min.css";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { getCategories, createPost } from "@/services/admin";

const AddPost = () => {
  const router = useRouter();
  const [contentDetail, setContentDetail] = React.useState({
    title: "",
    desc: "",
    imgUrl: "",
    catId: "",
  });
  const [listCategory, setListCategory] = React.useState([]);
  useEffect(() => {
    const fetchAllCategory = async () => {
      const data = await getCategories();
      setListCategory(data);
    };
    fetchAllCategory();
  }, []);
  const handleSubmit = async () => {
    await createPost({
      ...contentDetail,
    });
    router.push("/admin");
  };
  const onChangeDetailPost = (e, fieldName) => {
    setContentDetail({ ...contentDetail, [fieldName]: e.target.value });
  };
  const onChangeDescPost = (value, fieldName) => {
    setContentDetail({ ...contentDetail, [fieldName]: value });
  };
  const handleChangeCategory = (selected) => {
    const catOnChanging = listCategory.find((item) => item.title == selected);

    console.log("cat id: ", catOnChanging.id);
    setContentDetail({
      ...contentDetail,
      catName: selected,
      catId: catOnChanging.id,
    });
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
          <h1>Add page</h1>
          <Box>
            <IconButton
              color="primary"
              onClick={() => {
                router.push(`/admin`);
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
            label="Image URL"
            variant="outlined"
            value={contentDetail.imgUrl}
            onChange={(e) => onChangeDetailPost(e, "imgUrl")}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={contentDetail?.catName ?? ""}
              label="Category"
              onChange={(e) => handleChangeCategory(e.target.value)}
            >
              {listCategory.map((item) => (
                <MenuItem key={item.id} value={item.title}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <TextareaAutosize
            aria-label="minimum height"
            minRows={6}
            placeholder="Description..."
            style={{ width: "100%" }}
            value={contentDetail.desc}
            onChange={(e) => onChangeDetailPost(e, "desc")}
          /> */}
          <SimpleMDE
            placeholder="Description..."
            value={contentDetail.desc}
            onChange={(value) => onChangeDescPost(value, "desc")}
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

export default AddPost;
