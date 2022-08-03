import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Button from "@mui/material/Button";

const validationPost = yup.object().shape({
  name: yup.string().required("Campo Obrigatórios"),
  price: yup.string().required("Campo Obrigatórios"),
});

function Post() {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationPost),
  });

  const addPost = (data) => {
    axios
      .post("/api", data)
      .then(() => {
        console.log("Adicionado!");
        navigate("/");
      })
      .catch(() => {
        console.log(errors);
      });
  };

  return (
    <div>
      <main>
        <div className="add">
          <h1>Adicionar Instrumento</h1>
          <form onSubmit={handleSubmit(addPost)}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Nome"
                {...register("name")}
              />
              <p>{errors.name?.message}</p>
              <input
                type="number"
                name="price"
                placeholder="Preço"
                {...register("price")}
              />
              <p>{errors.price?.message}</p>
              <Link to="/">
                <Button color="secondary">
                  <ArrowCircleLeftIcon />
                </Button>
              </Link>
              <Button type="submit" color="secondary">
                <PostAddIcon />
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Post;
