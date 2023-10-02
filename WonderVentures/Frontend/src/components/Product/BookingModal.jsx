/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styleModalBooking from "./styleModalBooking.module.css";

const BookingModal = ({userDataJson, data, range}) => {
    const [next, setNext] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setNext((prevContador) => (prevContador + 1) % data.imagePath.length);
      }, 3000);
  
      return () => clearInterval(interval);
    }, [])

    return (
        <div className={styleModalBooking.mainModalContainer}>
          <h2> Reserva {data.name} </h2>
          <div className={styleModalBooking.userInfo}>
            <div className={styleModalBooking.boxInput}>
              <label>
                Usuario de la reserva 
              </label>
              {userDataJson &&
                <input 
                  type="text" 
                  value={userDataJson.userName.length > 1 ? userDataJson.userName : "" } 
                  placeholder="" 
                  readOnly
                  /> 
                }
              <label>
                Correo electronico
              </label>
              {userDataJson &&
                <input 
                  type="text" 
                  value={userDataJson.userEmail.length > 1 ? userDataJson.userEmail : "" } 
                  placeholder="" 
                  readOnly
                  /> 
                }
            </div>
            <div className={styleModalBooking.imgContainer}>
              <img 
                src={data.imagePath[next].url} 
                alt={data.name}
                className={styleModalBooking.imagen} />
            </div>
          </div>
    
          <div className={styleModalBooking.mainInfoBooking}>
            <div className={styleModalBooking.textBookingContainer}>
              <div>
                <p>Precio de la reserva</p> 
                <p><span>${data.price}</span></p>
              </div>
              <div>
                <p>
                  Tus fechas seleccionadas 
                </p>
                <p>
                  <span>
                    Del{" "}
                    {range[0].startDate.toLocaleDateString()} al{" "}
                    {range[0].endDate.toLocaleDateString()}
                    </span>
                </p>
              </div>
              <div>
                <p>Ubicación</p>
                <p><span>{data.location}</span></p>  
              </div>
            </div>
            <div className={styleModalBooking.politicsActivitiesContainer}>
              <h3>Actividades</h3>
              {data.activities.map((i) => {
                return (
                  <div key={i.id} className={styleModalBooking.politicsContainer}>
                    <p>- {i.text}</p>
                  </div>
                );
              })}
              <h3>Politicas</h3>
              {data.politics.map((i) => {
                return (
                  <div key={i.id} className={styleModalBooking.politicsContainer}>
                    <p>- {i.title}:  {i.description}</p>
                  </div>
                );
              })}

            </div>
          </div>
          <button className={styleModalBooking.reservarBtn}>Reservar</button>
        </div>
      );
}

export default BookingModal