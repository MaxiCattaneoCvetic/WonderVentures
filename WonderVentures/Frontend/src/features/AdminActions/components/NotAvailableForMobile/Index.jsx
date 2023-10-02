import NotAvailableMobile from "../../../../assets/NotAvailableMobile.png"
import {Link} from "react-router-dom"
import style from "./notAvailable.module.css"

function Index () {
	return(
		<div className={style.containerNotAvailable}>
		<img src={NotAvailableMobile} alt="" />
		<h2 className={style.noDisponible}>No disponible</h2>
		<h2 className={style.h2Moviles}>Para dispositivos móviles</h2>
		<button className={style.btnVolver}><Link to={"/"}>Volver al inicio</Link></button>
	</div>
	)
	
}

export default Index