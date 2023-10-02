import MainNavigation from "../../../../layouts/MainNavigation/Index";
import style from "./userManager.module.css";
import { fetchUsers,updateUser } from "../../../../services/adminApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isAdminLoggedIn } from "../../../user/Login/authSlice";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

function Index() {
  const [user, setUser] = useState();
  const [masterKey,setMasterKey] = useState(false);
  const isAdmin = useSelector(isAdminLoggedIn)
  const navigate = useNavigate()
  const codigoAdm = import.meta.env.VITE_REACT_APP_CODE_ADM;
  const emailAdm = import.meta.env.VITE_REACT_APP_EMAIL_ADM;

  useEffect(() => {
    if(!isAdmin){
      navigate('/')
    }
  }, [isAdmin])

  function handleAdminOFF(userData) {
    if(userData.username === emailAdm){
      swal("No se puede cambiar el rol de este usuario")
    }else{
      const updatedUserObj = {
        id: userData.id,
        name: userData.name,
        surname: userData.surname,
        username: userData.username,
        password: userData.password,
        role: 'USER',
      };
      updateUser(updatedUserObj)
      .then((response) => {
        console.log("User updated ok:", response);
        location.reload()
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
    }

    

    
  }
  
  function handleAdminON(userData) {
    const updatedUserObj = {
      id: userData.id,
      name: userData.name,
      surname: userData.surname,
      username: userData.username,
      password: userData.password,
      role: 'ADMIN',
    };
    updateUser(updatedUserObj)
      .then((response) => {
        console.log("User updated ok:", response);
        location.reload()
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  }
  function handlecorreo(){
    
      swal("Esto es información sensible de los usuarios de WonderVentures, si tienes la masterKey ingresala", {
        content: "input",
      })
      .then((value) => {
        if(value === codigoAdm){
          setMasterKey(true)
        }else if (value != codigoAdm){
          swal("Codigo incorrecto", "El codigo que ingresaste no es valido", "error")
          .then((value)=>{
              if(value){
                return
              }
          })
        }
      });
  }

  useEffect(() => {
    (async function () {
      const data = await fetchUsers();
      setUser(data);
      console.log(data);
    })();
  }, []);

  return (
    <>
      <div>
        <MainNavigation
          bkColor="var(--footerBackground)"
          position="relative"
        ></MainNavigation>
      </div>
      <div className={style.mainContainer}>
      <h1>Bienvenido al panel de usuarios</h1>
      <section className={style.userContainer}>
        <div className={style.Column}>
          <h3 className={style['table-title']}>Nombre</h3>
          <div className={style.nameItem}>
            {user
              ? user.map((users) => {
                  return <p key={users.id}>{users.name}</p>;
                })
              : ""}
          </div>
        </div>
        <div className={style.Column}>
          <h3 className={style['table-title']}>Email</h3>
          <div className={style.nameItem}>
            {user
              ? user.map((users) => {
                  return <p key={users.id}>{masterKey ? <p>{users.username}</p>: <button onClick={handlecorreo}>ver correo</button>}</p>;
                })
              : ""}
          </div>
        </div>
        <div className={style.Column}>
          <h3 className={style['table-title']}>Rol</h3>
          <div className={style.nameItem}>
            {user
              ? user.map((users) => {
                  return (
                    <>
                      <div className={style.containerRole} key={users.id}>
                        <p >{users.role}</p>
                        {users.role === 'ADMIN' ? 
                        <button onClick={() => handleAdminOFF(users)}>Quitar admin</button>

                        : (
                          <button onClick={() => handleAdminON(users)}>Hacer Admin</button>
                        )}
                      </div>
                    </>
                  );
                })
              : ""}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export default Index;
