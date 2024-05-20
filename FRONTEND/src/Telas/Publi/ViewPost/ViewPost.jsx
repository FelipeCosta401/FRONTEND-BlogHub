import { useState, useRef, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import axiosInstance from "../../../services/axiosConfig";
import UserContext from "../../../contexts/userContext";
import useFetchPost from "../../../hooks/useFetchPost";

import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import { IoIosCloseCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { FiMessageCircle } from "react-icons/fi";

import estilos from "./viewpost.module.css";

import Navbar from "../../../Components/Navbar/Navbar";
import Comment from "../../../Components/Comment/Comment/Comment";
import NewComment from "../../../Components/Comment/NewComment/NewComment";
import SettingsMenu from "../../../Components/SettingsMenu/SettingsMenu";
import ModalDelete from "../../../Components/ModalDelete/ModalDelete";

const ViewPost = () => {
  const { id } = useParams();
  const {
    postData,
    userPostData: postUser,
    commentsData: comments,
  } = useFetchPost(id);
  const [post, setPost] = useState({});
  const { logged, info } = useContext(UserContext);
  const [newComment, setNewComment] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    setPost((prevPost) => ({
      ...prevPost,
      ...postData,
    }));
    setCommentsData([...comments]);
  }, [postData]);

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
      axiosInstance
        .post("/like-publication", {
          user_id: info.id,
          publication_id: post.id,
        })
        .then(
          axiosInstance.get(`/publication/${id}`).then((res) => {
            setPost((prevPost) => ({
              ...prevPost,
              likes: res.data[0].likes_count,
            }));
          })
        );
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

  const handleUpdate = () => {
    axiosInstance.get(`/publication/${id}`).then((res) => {
      setCommentsData(res.data[0].comments);
    });
  };

  const handleEdit = () => {
    setOnEdit(!onEdit);
  };

  const handleSave = () => {
    if (!post.title || !post.desc) {
      toast.warn("Preencha todos os campos antes de atualizar");
    } else {
      axiosInstance
        .put(`config-publication`, {
          publication_id: post.id,
          title: post.title,
          description: post.desc,
        })
        .then(() => toast.success("Publicação atualizada com sucesso"))
        .catch((err) => console.log(err))
        .finally(() => setOnEdit(false));
    }
  };

  const handleDelete = () => {
    setOnDelete(!onDelete);
  };

  const statusDelete = (status) => {
    console.log(status);
    if (status) {
      toast.success("Publicação deletada com sucesso!");
    } else {
      toast.error("Ouve um erro ao deletar essa publicação!");
    }
  };

  return (
    <>
      <div className={estilos.container}>
        <header>
          <Navbar status={logged} props={info} />
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
                {info && info.id === postUser.id && (
                  <div className={estilos.options}>
                    <SettingsMenu
                      onEdit={() => handleEdit()}
                      onDelete={() => handleDelete()}
                    />
                    {onDelete && (
                      <ModalDelete
                        onDelete={() => handleDelete()}
                        id={post.id}
                      />
                    )}
                  </div>
                )}

                <div className={estilos.user}>
                  <Link to={`/profile/${postUser.id}`} style={{textDecoration: "none", color: "#000"}}>
                    <div
                      className={estilos.userInfo}
                      style={{ display: "flex" }}
                    >
                      {postUser.userImg ? (
                        <div
                          className={estilos.userImg}
                          style={{
                            backgroundImage: `url(${postUser.userImg})`,
                          }}
                        ></div>
                      ) : (
                        <FaUserCircle size={35} />
                      )}
                      <p style={{ alignSelf: "center" }}>{postUser.username}</p>
                    </div>
                  </Link>

                  <p>{formData(post.data)}</p>
                </div>
              </div>

              <div className={estilos.mainContent}>
                {!onEdit ? (
                  <div className={estilos.postTitle}>
                    <h1>{post.title}</h1>
                    <p>{post.desc}</p>
                  </div>
                ) : (
                  <fieldset style={{ padding: "5px 15px" }}>
                    <legend>Editar publicação</legend>
                    <IoIosCloseCircle
                      onClick={() => setOnEdit(false)}
                      size={35}
                      className={estilos.closeIcon}
                      style={{ paddingLeft: "90%", width: "100%" }}
                    />
                    <div className={estilos.postTitle}>
                      <input
                        type="text"
                        autoFocus
                        placeholder="Título da publicação"
                        className={estilos.inputEdit}
                        value={post.title}
                        onChange={(e) => {
                          setPost((prevPost) => ({
                            ...prevPost,
                            title: e.target.value,
                          }));
                        }}
                      />
                    </div>

                    <div className={estilos.postDesc}>
                      <input
                        type="text"
                        placeholder="Desrição da publicação"
                        className={estilos.inputEditDesc}
                        value={post.desc}
                        onChange={(e) => {
                          setPost((prevPost) => ({
                            ...prevPost,
                            desc: e.target.value,
                          }));
                        }}
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        onClick={() => handleSave()}
                      >
                        Atualziar
                      </Button>
                    </div>
                  </fieldset>
                )}

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
                    <p>{commentsData.length}</p>
                  </div>
                </div>
              </div>
              <h4>Comentários:</h4>
              <div
                className={estilos.commentsContainer}
                style={{ overflow: "auto" }}
              >
                {newComment && (
                  <NewComment
                    onUpdate={() => handleUpdate()}
                    onClose={() => setNewComment(false)}
                    id={id}
                    userId={info.id}
                  />
                )}
                {commentsData.length === 0 ? (
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
                      answerUpdate={() => handleUpdate()}
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
        <ToastContainer />
      </div>
    </>
  );
};

export default ViewPost;
