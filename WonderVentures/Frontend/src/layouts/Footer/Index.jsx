import style from "./footer.module.css";
import { BsInstagram, BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import logo from "../../assets/logofooter.png";
import { Link } from "react-router-dom";
const Index = () => {
  return (
    <footer >
      <div className={style.containerLogo}>
        <img src={logo} alt="logo-footer" />
        <p>
          Copyright © 2023 Wonder Vendures ltd. <br className={style.brCopy}></br>All rights reserved
        </p>
        <div className={style.containterIcon}>
          <Link className={style.iconBorder} to={""}>
            <BsInstagram className={style.iconSize} />
          </Link>
          <Link className={style.iconBorder} to={""}>
            <BsFacebook className={style.iconSize} />
          </Link>
          <Link className={style.iconBorder} to={""}>
            <BsTwitter className={style.iconSize} />
          </Link>
          <Link className={style.iconBorder} to={""}>
            <BsYoutube className={style.iconSize} />
          </Link>
        </div>
      </div>

      <div className={style.containerLinks}>
        <nav>
          <h4>Compañia</h4>
          <br className={style.brNavFooter} />
          <Link to="">About us</Link>
          <Link to="">blog</Link>
          <Link to="">Contáctanos</Link>
          <Link to="">Movil</Link>
          <Link to="">Testimonios</Link>
        </nav>
        <nav>
          <h4>Soporte</h4>
          <br  className={style.brNavFooter}/>
          <Link to="">Centro de ayuda</Link>
          <Link to="">Términos y servicios</Link>
          <Link to="">Legal</Link>
          <Link to="">Política de privacidad</Link>
        </nav>
        <div className={style.containerInput}>
        <h3>Quédate al dia</h3>
        <input type="mail"  placeholder="Tu correo eléctronico"  />
      </div>
      </div>
    </footer>
  );
};

export default Index;
