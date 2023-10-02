import { useEffect, useState } from 'react';
import '../formStyles.css';
import { Link, useNavigate } from 'react-router-dom';
import validateRegister from '../../../utils/formValidators/validateRegister';
import axios, { AxiosError } from 'axios';
import { URL_SEND_EMAIL } from '../../../utils/constants';
import FormErrorMsg from '../../../layouts/FormErrorMsg/Index';
import { useSelector } from 'react-redux';
import logo from "../../../assets/logoHeadNegro.png"
import {USER_NEW} from "../../../utils/constants"

const RegisterForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    surname: '',
    username: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false)
  const userData = useSelector((state) => state.auth);

  useEffect(() => {
    if(userData.token){
      navigate(-1)
    }
  }, [navigate, userData.token])

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { isValidRegister, dataErrors } = validateRegister(data);
    if (isValidRegister) {
      try {
        const res = await axios.post(USER_NEW, data);
        if (res.status === 200) {
          await axios.post(`${URL_SEND_EMAIL}${data.username}`);
          setIsRegistered(true)
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);
          if (error.data) {
            setFormErrors([
              {
                msg: error.response.data,
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
    } else {
      setFormErrors(dataErrors);
    }
  };

  const sendEmail = async() => {
    await axios.post(`${URL_SEND_EMAIL}${data.username}`);
  }


  return (
    
    <main className='login-main'>
      {!userData.token && 
      
        <section className='login-form-container'>
        {!isRegistered ? 
          <>
            <Link to={'/'}>
              <img src={logo} alt='' />
            </Link>
            <h3>Registrarse</h3>
            <form onSubmit={handleRegister}>
              <input
                type='text'
                placeholder='Nombre'
                name='name'
                onChange={handleChange}
                title='Escriba solo letras por favor'
                pattern='[a-zA-Z]+'
                value={data.name}
              />
              <input
                type='text'
                placeholder='Apellido'
                name='surname'
                title='Escriba solo letras por favor'
                pattern='[a-zA-Z]+'
                onChange={handleChange}
                value={data.surname}
              />
              <input
                type='email'
                placeholder='Correo Electrónico'
                name='username'
                onChange={handleChange}
                value={data.username}
              />
              <input
                type='password'
                name='password'
                placeholder='Contraseña'
                onChange={handleChange}
                value={data.password}
              />
              <div className='btn-container-login'>
                <Link to={'/login'}>
                  <button type='button' className='btn-header btn-header-a'>
                    Iniciar Sesión
                  </button>
                </Link>
                <button type='submit' className='btn-header'>
                  Registrarse
                </button>
              </div>
              <FormErrorMsg formErrors={formErrors} />
            </form>
          </>
        : 
          <section className='register-confirmation'>
            <h4>
              Se ha registrado correctamente. Debería llegarle un correo de confirmación
              al email que proporcionó
            </h4>
            <div className='btn-container-login'>
                <Link to={'/login'}>
                  <button type='button' className='btn-header btn-header-a'>
                    Iniciar Sesión
                  </button>
                </Link>
                <button type='button' onClick={sendEmail} className='btn-header'>
                  Reenviar correo
                </button>
            </div>
          </section>
        }
        </section>
      }  
    </main>
  );
};

export default RegisterForm;
