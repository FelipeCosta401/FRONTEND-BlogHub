import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosConfig";

const useFetchPost = (postId) => {
  const [postData, setPostData] = useState({});
  const [userPostData, setUserPostData] = useState({});
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      await axiosInstance(`publication/${postId}`).then((res) => {
        const publicationData = res.data[0];
        // console.log(publicationData)
        setPostData({
          id: publicationData.id,
          title: publicationData.title,
          desc: publicationData.description,
          img: publicationData.publication_image,
          data: publicationData.created_at,
          likes: publicationData.likes_count,
        });
        setUserPostData({
          id: publicationData.user.id,
          username: publicationData.user.username,
          userImg: publicationData.user.perfil_image,
        });
        setCommentsData(publicationData.comments);
      });
    };

    fetchPost();
  }, [postId]);

  return { postData, userPostData, commentsData };
};

export default useFetchPost;
