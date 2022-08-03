import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import Button from "@mui/material/Button";

const validationPost = yup.object().shape({
  name: yup.string().required("Campo Obrigatórios"),
  price: yup.string().required("Campo Obrigatórios"),
});

function Edit() {
  const { id } = useParams();

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationPost),
  });

  const addPost = (data) => {
    axios
      .put(`/api/${id}`, data)
      .then(() => {
        console.log("Adicionado!");
        navigate("/");
      })
      .catch(() => {
        console.log(errors);
      });
  };

  useEffect(() => {
    axios.get(`/api/${id}`).then((res) => {
      reset(res.data);
    });
  }, []);

  return (
    <div>
      <main>
        <div className="edit">
          <h1>Editar Instrumento</h1>
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
                <RotateLeftIcon />
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Edit;
