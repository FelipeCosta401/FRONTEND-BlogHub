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
    axios.get(`http://172.16.0.19:8000/api/publication/${id}`).then((res) => {
      setPost(res.data);
      setPostUser({
        name: res.data.user.username,
        img: res.data.user.perfil_image,
      });
    });
  }, [id]);

  return (
    <>
      <div className={estilos.container}>
        <header>
          <Navbar />
        </header>
        {/* <button onClick={() => console.log(postUser)}>teste</button> */}
        <main>
          <div className={estilos.post}>
            {!post.img ? (
              <p style={{ textAlign: "center", color: "red" }}>
                Essa publicação não possui imagem!
              </p>
            ) : (
              <div className={estilos.postImg}>
                <img src={post.img} alt="" />
              </div>
            )}
            <div className={estilos.postContent}>
              <div className={estilos.userInfo}>
                <div className={estilos.user}>
                  {postUser.img ? undefined : <FaUserCircle size={35} />}
                  <p>{postUser.name}</p>
                </div>
                <div className={estilos.postInfo}>
                  <p>Publicado: {post.created_at}</p>
                </div>
              </div>
              <div className={estilos.mainContent}>
                <div className={estilos.postTitle}>
                  <h1>{post.title}</h1>
                </div>
                <div className={estilos.postDesc}>
                  <p>{post.description}</p>
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
                <Comment />
                <Comment />
                <Comment />
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
