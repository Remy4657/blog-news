"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { getDetailPost, getCategories } from "@/services/admin";
import { updateDetailPost } from "@/services/admin";

const SinglePage = ({ params }) => {
  const router = useRouter();
  const { slug } = params;
  const [contentDetail, setContentDetail] = React.useState({
    id: "",
    title: "",
    desc: "",
    imgUrl: "",
    catSlug: "",
  });
  const [listCategory, setListCategory] = React.useState([]);
  const [valueCategory, setValueCategory] = React.useState("");
  useEffect(() => {
    const fetchDetailPost = async () => {
      const data = await getDetailPost(slug);
      setContentDetail({
        id: data.id,
        title: data.title,
        desc: data.desc,
        imgUrl: data.img,
        catSlug: data.catSlug,
      });
      setValueCategory(data.catSlug);
    };
    const fetchAllCategory = async () => {
      const data = await getCategories();
      setListCategory(data);
    };
    fetchDetailPost();
    fetchAllCategory();
  }, []);
  const handleSubmit = async () => {
    await updateDetailPost({
      ...contentDetail,
    });
    router.push("/admin");
  };
  const onChangeDetailPost = (e, fieldName) => {
    setContentDetail({ ...contentDetail, [fieldName]: e.target.value });
  };
  const handleChangeCategory = (event) => {
    setValueCategory(event.target.value);
    setContentDetail({ ...contentDetail, catSlug: event.target.value });
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={valueCategory}
              label="Category"
              onChange={handleChangeCategory}
            >
              {listCategory.map((item) => (
                <MenuItem key={item.id} value={item.title}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={6}
            placeholder="Description..."
            style={{ width: "100%" }}
            value={contentDetail.desc}
            onChange={(e) => onChangeDetailPost(e, "desc")}
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

export default SinglePage;
