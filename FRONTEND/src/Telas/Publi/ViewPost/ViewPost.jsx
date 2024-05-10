import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import axiosInstance from "../../../services/axiosConfig";
import UserContext from "../../../contexts/userContext";
import useFetchPost from "../../../hooks/useFetchPost";

import { FaUserCircle } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { FiMessageCircle } from "react-icons/fi";

import estilos from "./viewpost.module.css";

import Navbar from "../../../Components/Navbar/Navbar";
import Comment from "../../../Components/Comment/Comment/Comment";
import NewComment from "../../../Components/Comment/NewComment/NewComment";

const ViewPost = () => {
  const { id } = useParams();
  const {
    postData: post,
    userPostData: postUser,
    commentsLength,
    commentsData,
  } = useFetchPost(id);
  const { logged, info } = useContext(UserContext);
  const [newComment, setNewComment] = useState(false);

  function formData(data) {
    const dataObj = new Date(data);
    const dataFormatada = dataObj.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return dataFormatada;
  }

  const handleLike = () => {
    if (logged) {
      axiosInstance.post("/like-publication", {
        user_id: info.id,
        publication_id: post.id,
      });
      axiosInstance.get(`/publication/${id}`).then((res) => {
        setPost((prevPost) => ({
          ...prevPost,
          likes: res.data[0].likes_count,
        }));
      });
    } else {
      window.location.replace("/login");
    }
  };

  const handleComment = () => {
    if (logged) {
      setNewComment(true);
    } else {
      window.location.replace("/login");
    }
  };

  return (
    <>
    <button onClick={() => console.log(commentsData)}>Teste</button>
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
                  <p>Publicado: {formData(post.data)}</p>
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
                    <AiFillLike
                      size={30}
                      className={estilos.likeIcon}
                      onClick={() => handleLike()}
                    />
                    <p>{post.likes}</p>
                  </div>
                  <div className={estilos.reactionsComments}>
                    <FiMessageCircle
                      size={30}
                      className={estilos.commentIcon}
                      onClick={() => handleComment()}
                    />
                    <p>{commentsLength}</p>
                  </div>
                </div>
              </div>
              <h4>Comentários:</h4>
              <div
                  className={estilos.commentsContainer}
                  style={{ overflow: "auto" }}
                >
                  {newComment && (
                    <NewComment onClose={() => setNewComment(false)} />
                  )}
                  {commentsLength === 0 ? (
                    <p style={{ textAlign: "center", color: "#fff" }}>
                      Essa publicação ainda não possui comentários!
                    </p>
                  ) : (
                    commentsData.map((comment) => (
                      <Comment
                        props={comment}
                        key={comment.id}
                        data={formData(comment.created_at)}
                        newComment={false}
                      />
                    ))
                  )}
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
