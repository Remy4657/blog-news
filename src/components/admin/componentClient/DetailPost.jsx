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
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  getDetailPost,
  getCategories,
  updateDetailPost,
} from "@/services/admin";

const DetaiPost = ({ slug }) => {
  const router = useRouter();
  const [contentDetail, setContentDetail] = React.useState({
    id: "",
    title: "",
    desc: "",
    imgUrl: "",
    catId: "",
  });
  const [listCategory, setListCategory] = React.useState([]);
  const [valueCategory, setValueCategory] = React.useState("");
  useEffect(() => {
    const fetchDetailPost = async () => {
      const data = await getDetailPost(slug);
      console.log("data: ", data);
      setContentDetail({
        id: data.id,
        title: data.title,
        desc: data.desc,
        imgUrl: data.img,
        catId: data.cat.id,
        catName: data.cat.title,
      });
      setValueCategory(data.cat.title);
    };
    const fetchAllCategory = async () => {
      const data = await getCategories();
      setListCategory(data);
    };
    fetchDetailPost();
    fetchAllCategory();
  }, [slug]);
  const handleSubmit = async () => {
    await updateDetailPost({
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

    //setValueCategory(event.target.value);
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
          <h1>Detail page</h1>
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
          {contentDetail.catName ?? ""}
          {contentDetail.catId ?? ""}

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

          <SimpleMDE
            placeholder="Description..."
            value={contentDetail.desc}
            onChange={(value) => onChangeDescPost(value, "desc")}
            style={{ width: "800px" }}
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
