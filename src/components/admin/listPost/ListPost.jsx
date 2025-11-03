import * as React from "react";
import { useRouter } from "next/navigation";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { getPost, deletePost } from "@/services/admin";

const columns = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "image", label: "Image", minWidth: 100 },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "right",
  },

  {
    id: "category",
    label: "Category",
    minWidth: 170,
    align: "right",
  },
];

export default function ListPost() {
  const router = useRouter();
  const [listPost, setListPost] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openPopupDelete, setOpenPopupDelete] = React.useState(false);
  const [idPostDelete, setIdPostDelete] = React.useState("");
  const getAllPosts = async () => {
    const { posts } = await getPost(null, null);
    const newPosts = posts.map((post) => ({
      id: post.id,
      title: post.title,
      image: post.img,
      description: post.desc,
      category: post.catSlug,
      slug: post.slug,
    }));
    setListPost(newPosts);
  };
  React.useEffect(() => {
    getAllPosts();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // logic show/hide popup delete
  const handleClickOpen = (row) => {
    setIdPostDelete(row.id);
    setOpenPopupDelete(true);
  };

  const handleClose = () => {
    setOpenPopupDelete(false);
  };
  // logic handle delete post
  const handleDelete = async () => {
    await deletePost(idPostDelete);
    getAllPosts();
    handleClose();
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "10px" }}>
        <IconButton
          color="primary"
          onClick={() => {
            router.push("/admin/add-post");
          }}
          sx={{
            border: "1px solid",
            borderRadius: "5px",
            fontSize: "18px",
          }}
        >
          <AddIcon />
          Add
        </IconButton>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {listPost
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <>
                            {" "}
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          </>
                        );
                      })}
                      <TableCell
                        key="action"
                        align="left"
                        style={{ minWidth: 100 }}
                      >
                        <IconButton
                          color="primary"
                          onClick={() => {
                            router.push(`/admin/${row.slug}`);
                          }}
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          color="primary"
                          onClick={() => handleClickOpen(row)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[1, 2, 10]}
          component="div"
          count={listPost.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog
        open={openPopupDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
