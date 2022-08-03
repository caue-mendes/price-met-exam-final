import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";

function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("/api")
      .then((res) => {
        setPosts(res.data);
      })
      .catch(() => {
        console.log("Error!");
      });
  }, []);

  function deletePost(id) {
    axios.delete(`/api/${id}`);
    setPosts(posts.filter((post) => post.id !== id));
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <TableContainer sx={{ paddingTop: 15 }}>
      <Table
        sx={{
          width: 400,
          margin: "auto",
        }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Nome</StyledTableCell>
            <StyledTableCell align="right">Preço</StyledTableCell>
            <StyledTableCell align="right">
              <Link to="/post">
                <Button size="small" color="secondary">
                  <AddCircleIcon />
                </Button>
              </Link>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody backgroundColor="white">
          {posts.map((post, key) => (
            <StyledTableRow key={key}>
              <StyledTableCell component="th" scope="row">
                {post.name}
              </StyledTableCell>
              <StyledTableCell align="right">{post.price} $</StyledTableCell>
              <StyledTableCell align="right">
                <Link to={{ pathname: `/edit/${post.id}` }}>
                  <Button color="secondary">
                    <EditIcon />
                  </Button>
                </Link>
                <Button color="secondary" onClick={() => deletePost(post.id)}>
                  <DeleteForeverIcon />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Feed;

{
  /* Whitout MUI
    <div>
      <h1>Page Feed</h1>
      <Link to="/post">
        <button>+</button>
      </Link>
      {posts.map((post, key) => {
        return (
          <div key={key}>
            <p>{post.name}</p>
            <p>{post.price}</p>
            <Link to={{ pathname: `/edit/${post.id}` }}>
              <button>Edit</button>
            </Link>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        );
      })}
    </div> 
  */
}
