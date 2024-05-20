import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FaUserCircle, FaReply } from "react-icons/fa";
import {
  MdOutlineSubdirectoryArrowRight,
  MdArrowUpward,
  MdSend,
} from "react-icons/md";
import { AiFillLike } from "react-icons/ai";

import { ToastContainer, toast } from "react-toastify";

import NewComment from "../NewComment/NewComment";
import estilos from "./comment.module.css";
import { Button } from "@mui/material";
import axiosInstance from "../../../services/axiosConfig";

const Comment = ({ props: comment, data, answerUpdate }) => {
  // const [comment, setComment] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);
  const [answerMessage, setAnswerMessage] = useState("");
  const [answerPostId, setAnswerPostId] = useState();

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
    setIsAnswer(false);
  };

  const handleAnswer = (id) => {
    setAnswerPostId(id);
    setShowAnswer(true);
    setIsAnswer(!isAnswer);
  };

  const sendAnswer = () => {
    if (!answerMessage) {
      toast.warn("Preencha o campo da mensagem!");
    } else {
      axiosInstance
        .post("answer", {
          comment_id: answerPostId,
          message: answerMessage,
        })
        .then(() => toast.success("Resposta enviada com sucesso!"))
        .catch((err) => {
          toast.error("Resposta não enviada");
        })
        .finally(() => {
          setIsAnswer(false);
          setAnswerMessage("");
          answerUpdate();
        });
    }
  };

  const formatData = (date) => {
    const data = new Date(date);
    const dataFormatada = data.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
    return dataFormatada;
  };

  return (
    <>
      <div className={estilos.container}>
        <div className={estilos.userInfo}>
          <Link
            to={`/profile/${comment.user.id}`}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <div className={estilos.user}>
              {comment.user.perfil_image !== null ? (
                <div
                  className={estilos.userImg}
                  style={{
                    backgroundImage: `url(${comment.user.perfil_image})`,
                  }}
                ></div>
              ) : (
                <FaUserCircle size={20} />
              )}
              <p>{comment.user.username}</p>
            </div>
          </Link>

          <div className={estilos.postInfo}>
            <p>{data}</p>
          </div>
        </div>

        <div className={estilos.content}>
          <div className={estilos.comment}>
            <p>{comment.message}</p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              alignContent: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              className={estilos.commentInfo}
              onClick={() => handleAnswer(comment.id)}
            >
              <FaReply size={20} />
            </div>
            <div className={estilos.commentInfo} onClick={() => undefined}>
              <AiFillLike size={20} />
              <p>{comment.likecomments_count}</p>
            </div>
          </div>
        </div>

        {comment.answers.length > 0 && (
          <div className={estilos.footer} onClick={() => handleShowAnswer()}>
            {showAnswer ? (
              <div className={estilos.footer}>
                <MdArrowUpward size={25} />
                <p>ocultar {comment.answers.length} respostas</p>
              </div>
            ) : (
              <div className={estilos.footer}>
                <MdOutlineSubdirectoryArrowRight size={25} />
                <p>Ver {comment.answers.length} respostas</p>
              </div>
            )}
          </div>
        )}
        {isAnswer && (
          <div className={estilos.newAnswer}>
            <input
              type="text"
              placeholder="Algum comentário legal..."
              value={answerMessage}
              onChange={(e) => setAnswerMessage(e.target.value)}
            />
            <Button
              onClick={() => sendAnswer()}
              variant="contained"
              style={{ width: "20%", height: "50%", marginRight: "15px" }}
            >
              <MdSend size={20} />
            </Button>
          </div>
        )}
        {showAnswer &&
          comment.answers.map((answer) => (
            <div
              key={answer.id}
              className={estilos.answer}
              style={{
                width: "90%",
              }}
            >
              <div className={estilos.answerHeader}>
                <Link to={`/profile/${answer.user.id}`} style={{textDecoration: "none", color: "#000"}}>
                  <div className={estilos.user}>
                    <div
                      style={{
                        backgroundImage: `url(${answer.user.perfil_image})`,
                      }}
                      className={estilos.userImg}
                    ></div>
                    {answer.user.username}
                  </div>
                </Link>
                <div className={estilos.answerInfo}>
                  {formatData(answer.created_at)}
                </div>
              </div>
              <div className={estilos.answerContent}>
                <div className={estilos.answerMessage}>{answer.message}</div>
                <div className={(estilos.answerLikes, estilos.commentInfo)}>
                  <AiFillLike size={20} />
                  <p>{answer.likeanswers_count}</p>
                </div>
              </div>
            </div>
          ))}
        <ToastContainer />
      </div>
    </>
  );
};

export default Comment;
