import { useState, useEffect } from "react";

import Button from "@mui/material/Button";

import { FaRegUserCircle, FaPaperclip } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";

import estilos from "./newpublication.module.css";

const NewPublication = ({ userInfo }) => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    publication_image: "",
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
    console.log(post);
  };

  return (
    <>
      <div>
        <form className={estilos.container} onSubmit={handleSubmit}>
          <div className={estilos.main}>
            <FaRegUserCircle size={40} />
            <div className={estilos.inputGroup}>
              <input
                type="text"
                name="title"
                value={post.title}
                onChange={handleChange}
                placeholder="Qual o assunto do momento?"
                style={{ width: "50%", margin: "0 auto" }}
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
            </div>
          </div>
          <div className={estilos.footer}>
            <div className={estilos.options}>
              <FaPaperclip size={30} />
              <MdEmojiEmotions size={30} />
              <FiPlusCircle size={30} />
            </div>
            <div className={estilos.btnSend}>
              <Button type="submit" variant="contained" endIcon={<IoMdSend />}>
                Publicar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewPublication;
