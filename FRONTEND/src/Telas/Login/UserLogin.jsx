import LoginModal from "../../Components/ModalLogin/LoginModal/Modal/LoginModal";
import RegisterModal from "../../Components/ModalLogin/RegisterModal/Modal/RegisterModal";

const UserLogin = ({ action }) => {
  return (
    <>
      <div className="container">
        {action == "login" ? <LoginModal /> : <RegisterModal />}
      </div>
    </>
  );
};

export default UserLogin;
