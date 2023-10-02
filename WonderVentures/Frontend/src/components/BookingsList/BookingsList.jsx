/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import MainNavigation from "../../layouts/MainNavigation/Index";
import BookingCard from "./BookingCard";
import "./bookings.css";
import { URL } from "../../utils/constants";
import { useSelector } from "react-redux";
import { user } from "../../features/user/Login/authSlice";
import { useState } from "react";
import axios from "axios";
import Spinner from "../Spinner/Index";
import { useLocation, useNavigate } from "react-router-dom";

const BookingsList = () => {
  const userData = useSelector(user);
  const jsonUserData = JSON.parse(userData);
  const navigate = useNavigate();
  const location = useLocation();
  const [nextBookings, setNextBookings] = useState(undefined);
  const [pastBookings, setPastBookings] = useState(undefined);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get(
          `${URL}/bookings/${jsonUserData.userEmail}`
        );
        const currentDate = new Date(); // Obtiene la fecha actual

        // Filtra los datos para obtener NextBookings (endDate después del día de hoy)
        const nextBookingsData = data.filter((booking) => {
          const endDate = new Date(
            booking.endDate[0],
            booking.endDate[1] - 1,
            booking.endDate[2]
          ); // Convierte endDate en un objeto Date
          return endDate > currentDate;
          
        });
    
        // Filtra los datos para obtener PastBookings (endDate ya pasó)
        const pastBookingsData = data.filter((booking) => {
          const endDate = new Date(
            booking.endDate[0],
            booking.endDate[1] - 1,
            booking.endDate[2]
          ); // Convierte endDate en un objeto Date
          return endDate < currentDate;
        });

        setNextBookings(nextBookingsData);
        setPastBookings(pastBookingsData);
      } catch (error) {
        console.log(error);
      }
    };

    if (!jsonUserData) {
      navigate("/login", {
        state: {
          previousUrl: location.pathname,
        },
      });
    }

    if (jsonUserData?.userEmail) {
      fetchBookings();
    }
  }, []);

  if (!nextBookings || !pastBookings) {
    return (
      <div className={"container-spinner container-spinner-full"}>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <MainNavigation bkColor={"var(--footerBackground)"} />
      <main
        className={
          nextBookings?.length > 1 || pastBookings?.length > 1
            ? "bookingMainB"
            : "bookingMain"
        }
      >
        <section className="bookings-container">
          <h1>Próximas reservas:</h1>
          {nextBookings.length > 0 ? (
            nextBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <p>No tienes próximas reservas</p>
          )}
          <h1>Experiencias realizadas:</h1>
          <div className="experiences-done-grid">
            {pastBookings.length > 0 ? (
              pastBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  experienceDone={true}
                  booking={booking}
                />
              ))
            ) : (
              <p>
                Todavía no has realizado una experiencia ¿Qué estás esperando?
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default BookingsList;
