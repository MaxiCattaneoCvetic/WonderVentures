import "./home.css"
import { Link } from "react-router-dom";
import { token,user } from "../../features/user/Login/authSlice";
import { useSelector } from "react-redux";
import image from "../../assets/Preview.png"



function Index() {
  const isAuth = useSelector(token);
  const userJson = useSelector(user);
  const userNew = JSON.parse(userJson)

  return (
    <>
      <section className="container-home">
        <div className="video-wrapper">
          <video playsInline autoPlay muted loop preload="none" poster={image}>
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div className="container-home-info">
          <h3 className="visita-text">VISITA ARGENTINA</h3>
          <p className="info-p">Planea con nosotros tu viaje, registrate ahora</p>
          {!isAuth?<button className="btn-primary register"> <Link to={"/register"}>Registrate</Link></button>: <h2 className="welcomeUser">¡Hola <strong>{userNew.userName} </strong>que gusto tenerte de nuevo!</h2>}
        </div>
      </section>
    </>
  );
}

export default Index;
