/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "../formStyles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useDispatch,useSelector } from "react-redux";
import { login, } from "./authSlice";
import logo from "../../../assets/logoHeadNegro.png"
import {URL_LOGIN} from "../../../utils/constants" 

const LoginForm = () => {
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState([]);
  const userData = useSelector((state) => state.auth);
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if(userData.token){
      if(location.state){
        navigate(location?.state?.previousUrl)
      }else {
        navigate('/')
      }
    }
  }, [userData])

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(URL_LOGIN, data);
      dispatch(login(res.data));
      // Redirigir a inicio
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        console.log(error);
        if (error.response.data.error) {
          setFormErrors([
            {
              msg: error.response.data.error,
            },
          ]);
        } else {
          
          setFormErrors([
            {
              msg: error.message,
            },
          ]);
        }
      }
    }


  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="login-main">
      {!userData.token && 
      
        <section className="login-form-container">
          <Link to={"/"}>
            <img src={logo} alt="logoWonder" />
          </Link>
          <h3>Inicia sesión</h3>
          <Link to={"/register"} className="link-style">
            <h4>O crea una cuenta</h4>
          </Link>

          <form onSubmit={handleSignIn}>
            <input
              type="email"
              placeholder="Correo Electrónico"
              onChange={handleChange}
              value={data.username}
              name="username"
            />
            <input
              type="password"
              placeholder="Contraseña"
              onChange={handleChange}
              value={data.password}
              name="password"
            />
            <div className="btn-container-login">
              <Link to={"/register"}>
                <button type="button" className="btn-header btn-header-a">
                  Crear Cuenta
                </button>
              </Link>
              <button type="submit" className="btn-header">
                Iniciar Sesión
              </button>
            </div>
            <nav className="form-errors">
              <ul>
                {formErrors.length > 0 &&
                  formErrors.map((error, i) => <li key={i}>{error.msg}</li>)}
              </ul>
            </nav>
          </form>
        </section>
      }
    </main>
  );
};

export default LoginForm;
