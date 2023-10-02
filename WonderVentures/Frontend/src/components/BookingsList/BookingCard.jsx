/* eslint-disable react/prop-types */
import {BiMap} from 'react-icons/bi'
import ReviewModal from './ReviewModal/ReviewModal'
import { useState } from 'react'
import swal from 'sweetalert';
import axios from "axios"
import {URL_BOOKING} from "../../utils/constants"


const meses = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
];

const BookingCard = ({experienceDone, booking}) => {
    const [modalActive, setModalActive] = useState(false)
    const startDate = new Date(booking.startDate[0], booking.startDate[1] - 1, booking.startDate[2])
    const endDate = new Date(booking.endDate[0], booking.endDate[1] - 1, booking.endDate[2])


    async function deleteBookin(bookingId) {
        try {
            await axios.delete(URL_BOOKING + bookingId);
            swal("¡Tu reserva se elimino correctamente!", {
                icon: "success",
            }).then((value)=>{
                if(value){
                    location.reload();
                }else{
                    location.reload();
                }
            })
             
        } catch (error) {
            swal("Hubo un error inesperado", "Tu reserva no se pudo eliminar", "error", {
                button: "Volver a mis reservas",
            });
        }
                    
    }

    function handleDelete(bookingId){
        swal({
            title: "¿Estas seguro de eliminar tu reserva?",
            text: "Una vez eliminada no podras volver atras",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
            deleteBookin(bookingId);
            } else {
            swal("¡Se anulo la eliminación de la reserva!");
            }
        });

    }

    return (
        <>
            <div className={`booking-card ${experienceDone ? 'booking-card-done' : ''}`}>
                <div className="booking-card-img-container">
                    <img src={booking.experience.imagePath[0].url} alt="" />
                </div>
                <div className="booking-card-descript-container">
                    <h4>{booking.experience.name}</h4>
                    <div className='booking-card-location-container'>
                        <BiMap className='booking-card-location-icon'/> 
                        <p>{booking.experience.location}</p>
                    </div>
                    <div className={experienceDone ? 'expdone-date-btn-container' : 'expnext-date-btn-container'}>
                        
                        {
                            experienceDone ?
                            <>
                                <p>
                                    {startDate.getDate()} {meses[startDate.getMonth()]}, {startDate.getFullYear()}
                                    {' / '}
                                    {endDate.getDate()} {meses[endDate.getMonth()]}, {endDate.getFullYear()}
                                </p>
                                <button onClick={() => setModalActive(!modalActive)}>
                                    Reseñar
                                </button>
                            </>
                            :
                            <>
                                <p>
                                    Fecha: {' '}
                                    {startDate.getDate()} {meses[startDate.getMonth()]}, {startDate.getFullYear()}
                                    {' / '}
                                    {endDate.getDate()} {meses[endDate.getMonth()]}, {endDate.getFullYear()}
                                </p>
                                <button onClick={()=>{
                                    handleDelete(booking.id)
                                }}>
                                    Eliminar Reserva
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>
            {modalActive && <ReviewModal setModalActive={setModalActive} booking={booking}/>}
        </>
    )
}

export default BookingCard