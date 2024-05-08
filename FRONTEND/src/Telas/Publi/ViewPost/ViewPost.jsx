import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { FaUserCircle } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { FiMessageCircle } from "react-icons/fi";

import estilos from "./viewpost.module.css";

import Navbar from "../../../Components/Navbar/Navbar";
import Comment from "../../../Components/Comment/Comment";

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [postUser, setPostUser] = useState({});

  useEffect(() => {
    //GET das publicações
    axios.get(`http://172.16.0.19:8000/api/publication/${id}`).then((res) => {
      console.log(res.data);
      // setPost({
      //   title: res.data.title,
      //   desc: res.data.description,
      //   img: res.data.publication_image,
      // });
      // setPostUser({
      //   username: res.data.user.username,
      //   userImg: res.data.user.perfil_image,
      // });

      //FORMATA A DATA
      //   const data = new Date(res.data.created_at);
      //   const dataFormatada = data.toLocaleString("pt-BR", {
      //     day: "2-digit",
      //     month: "2-digit",
      //     year: "numeric",
      //   });
      //   setPost((prevPost) => ({
      //     ...prevPost,
      //     data: dataFormatada,
      //   }));
    });
  }, [id]);

  return (
    <>
      <div className={estilos.container}>
        <header>
          <Navbar />
        </header>
        <main>
          <div className={estilos.post}>
            <div className={estilos.postImg}>
              {post.img ? (
                <img src={post.img} alt="" />
              ) : (
                <p style={{ textAlign: "center" }}>Carregando...</p>
              )}
            </div>

            <div className={estilos.postContent}>
              <div className={estilos.header}>
                <div className={estilos.user}>
                  {postUser.userImg ? (
                    <img src={postUser.userImg} style={{ width: "30px" }} />
                  ) : (
                    <FaUserCircle size={35} />
                  )}
                  <p>{postUser.username}</p>
                </div>

                <div className={estilos.postInfo}>
                  <p>Publicado: {post.data}</p>
                </div>
              </div>

              <div className={estilos.mainContent}>
                <div className={estilos.postTitle}>
                  <h1>{post.title}</h1>
                </div>

                <div className={estilos.postDesc}>
                  <p>{post.desc}</p>
                </div>

                <div className={estilos.postFooter}>
                  <div className={estilos.reactionsLike}>
                    <AiFillLike size={25} />
                    <p>150</p>
                  </div>
                  <div className={estilos.reactionsComments}>
                    <FiMessageCircle size={25} />
                    <p>4</p>
                  </div>
                </div>
              </div>
              <h4>Comentários:</h4>
              <div className={estilos.commentsContainer}>
                {/* <Comment props={post.comments} /> */}
              </div>
            </div>
          </div>
        </main>
        <footer>
          <h1>E esse é o footer</h1>
        </footer>
      </div>
    </>
  );
};

export default ViewPost;
