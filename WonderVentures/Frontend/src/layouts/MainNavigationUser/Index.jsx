import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./mainNavigationUser.module.css";
import {
  logout,
  user,
  isAdminLoggedIn,
} from "../../features/user/Login/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ProfileDetails from "../../components/ProfileDetails/Index";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMiPerfilOpen, setIsMiPerfilOpen] = useState(false);
  const dispatch = useDispatch();
  const jsonData = useSelector(user);
  const userData = JSON.parse(jsonData);
  const isAdm = useSelector(isAdminLoggedIn);

  return (
    <>
      <div className={style.containerSession}>
        <div
          className={style.avatarBackground}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <p>
            {userData.userName
              ? userData.userName.charAt(0).toUpperCase()
              : null}{" "}
            {userData.userLastName
              ? userData.userLastName.charAt(0).toUpperCase()
              : null}
          </p>
        </div>
        {isOpen && (
          <div className={style.linkDropMenu}>
            <Link onClick={() => setIsMiPerfilOpen(!isMiPerfilOpen)}>
              Mi perfil
            </Link>
            <Link to={"/wishlist"}>Favoritos</Link>
            {isAdm ? (
              <Link to={"/admin"}>Panel de administracion</Link>
            ) : (
              <Link to={"/"}>Configuración de usuario</Link>
            )}{" "}
            {!isAdm ? (
              ""
            ) : (
              <Link to={"/admin/userManager"}>Usuarios</Link>
            )}{" "}
            
            <Link
              onClick={() => {
                dispatch(logout());
              }}
            >
              Cerrar Sesión
            </Link>
          </div>
        )}
      </div>
      {isMiPerfilOpen && (
        <ProfileDetails setIsMiPerfilOpen={setIsMiPerfilOpen} />
      )}
    </>
  );
};

export default DropdownMenu;
