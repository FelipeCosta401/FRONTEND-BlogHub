import { useState, useContext } from "react";
import axiosInstance from "../../services/axiosConfig";
import userContext from "../../contexts/userContext";

import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegUserCircle, FaPaperclip } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

import estilos from "./newpublication.module.css";

const NewPublication = ({ userInfo }) => {
  const { info } = useContext(userContext);
  const [post, setPost] = useState({
    title: "",
    description: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!post.title || !post.description) {
      toast.warn("Preencha os campos!");
    } else {
      axiosInstance
        .post("publication", {
          user_id: info.id,
          title: post.title,
          description: post.description,
          publication_image: post.img,
        })
        .then(() => {
          toast.success("Publicado com sucesso!");
          setPost({
            title: "",
            description: "",
            img: "",
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div>
        <form className={estilos.container} onSubmit={handleSubmit}>
          <div className={estilos.main}>
            {info.perfil_image ? (
              <div
                className={estilos.userImg}
                style={{ backgroundImage: `url(${info.perfil_image})` }}
                alt="Foto de perfil"
              ></div>
            ) : (
              <FaRegUserCircle size={40} style={{ alignSelf: "start" }} />
            )}
            <div className={estilos.inputGroup}>
              <input
                type="text"
                name="title"  
                value={post.title}
                onChange={handleChange}
                placeholder="Qual o assunto do momento?"
                className={estilos.input}
              />
              <input
                type="text"
                name="description"
                value={post.description}
                onChange={handleChange}
                placeholder="Fale mais sobre...."
                className={estilos.input}
              />
              <input
                type="text"
                name="img"
                value={post.img}
                onChange={handleChange}
                placeholder="Endereço da imagem...."
                className={estilos.input}
              />
              <br />
              <Button type="submit" variant="contained" endIcon={<IoMdSend />}>
                Publicar
              </Button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default NewPublication;
