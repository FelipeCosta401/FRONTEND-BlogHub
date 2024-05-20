import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import axiosInstance from "../../services/axiosConfig";

import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { FaLongArrowAltLeft } from "react-icons/fa";

import estilos from "./userprofile.module.css";

import Logo from "../../assets/MainLogo.png";
import UserArea from "../../Components/UserArea/UserArea";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function UserProfile() {
  const { id } = useParams();
  const { logged, info } = useContext(UserContext);
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [userPosts, setUserPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    axiosInstance.get(`users/${id}`).then((res) => {
      // console.log(res.data);
      setUserInfo(res.data.Usuario[0]);
      setUserPosts(res.data.Usuario[0].publications);
      setLikedPosts(res.data.PublicacoesCurtidas);
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <header className={estilos.header}>
        <Link to="/" className={estilos.headerLink}>
          <FaLongArrowAltLeft size={35} />
          <p>Página inicial</p>
        </Link>
      </header>
      <main>
        <div className="">
          <UserArea props={userInfo} />
        </div>
        <div className="">
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label="Suas publicações" />
            <Tab label="Curtidas" />
          </Tabs>

          <TabPanel value={value} index={0}>
            <div className={estilos.cards}>
              {userPosts.map((post) => (
                <Link to={`/post/${post.id}`} key={post.id}>
                  <img src={post.publication_image} className={estilos.card} />
                </Link>
              ))}
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className={estilos.cards}>
              {likedPosts.map((post) => (
                <Link to={`/post/${post.id}`} key={post.id}>
                  <img src={post.publication_image} className={estilos.card} />
                </Link>
              ))}
            </div>
          </TabPanel>
        </div>
      </main>
    </>
  );
}
