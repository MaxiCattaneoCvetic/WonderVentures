/* eslint-disable react/prop-types */
import { addDays, parseISO } from "date-fns";
import { DateRange } from "react-date-range";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal/Index";
import FormErrorMsg from "../../layouts/FormErrorMsg/Index";
import BookingModal from "./BookingModal";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { token, user } from "../../features/user/Login/authSlice";
import { URL } from "../../utils/constants";
import "./swalStyle.css";

function getDatesBetween(startDate, endDate) {
  const datesArray = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    datesArray.push(parseISO(currentDate.toISOString())); // Añade la fecha al arreglo en el formato deseado
    currentDate.setDate(currentDate.getDate() + 1); // Avanza al siguiente día
  }

  return datesArray;
}

function formatDateToISO(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  return `${year}-${formattedMonth}-${formattedDay}`;
}

const isAvailableDate = (startDate, endDate, disabledDates) => {
  // Eliminamos la hora de las fechas de inicio y fin
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  // Verificamos si startDate o endDate están en disabledDates
  if (disabledDates.includes(startDate) || disabledDates.includes(endDate)) {
    return false;
  }

  // Verificamos si alguna fecha en disabledDates está dentro del rango
  for (const date of disabledDates) {
    if (date >= startDate && date <= endDate) {
      return false;
    }
  }

  // Si no se encontraron coincidencias, las fechas son válidas
  return true;
};

const Description = ({ data, setFormErrors, formErrors, icons }) => {
  const navigate = useNavigate();
  const isAuth = useSelector(token);
  const [openModal, setOpenModal] = useState(false);
  const [disabledDates, setDisabledDates] = useState([]);
  const [showMonths, setShowMonths] = useState(false);
  const userData = useSelector(user);
  const userDataJson = JSON.parse(userData);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: "selection",
    },
  ]);
  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
    document
      .querySelector(".rdrDateDisplayWrapper")
      .addEventListener("click", toggleMonths, true);
    const fetchExperienceData = async () => {
      try {
        const { data: bookings } = await axios.get(
          `${URL}/bookings/experience/${data.id}`
        );
        const bookedDates = bookings.reduce((datesArray, booking) => {
          const date = {
            startDate: parseISO(formatDateToISO(booking.startDate.join("-"))),
            endDate: parseISO(formatDateToISO(booking.endDate.join("-"))),
          };

          const datesBetween = getDatesBetween(date.startDate, date.endDate);
          return datesArray.concat(datesBetween);
        }, []);

        setDisabledDates(bookedDates);
      } catch (error) {
        setFormErrors([
          {
            msg: "Error al cargar fechas disponibles. Por favor, intente más tarde",
          },
        ]);
      }
    };
    if (data?.id) {
      fetchExperienceData();
    }

    return () => {
      document.removeEventListener("keydown", hideOnEscape);
      document.removeEventListener("click", hideOnClickOutside);
    };
  }, [data.id, setFormErrors]);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setShowMonths(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setShowMonths(false);
    }
  };

  const toggleMonths = () => {
    setShowMonths(!showMonths);
  };

  function handleClick() {
    swal({
      title: "¡Crea una cuenta o inicia sesión para reservar!",
      icon: "info",
      buttons: ["Iniciar Sesión", "Crear Cuenta"],
    }).then((value) => {
      if (value) {
        navigate("/register");
      } else if (value === null) {
        navigate("/login");
      }
    });
  }

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${URL}/bookings`, {
        startDate: range[0].startDate,
        endDate: range[0].endDate,
        experience: {
          id: data.id,
        },
        user: {
          username: JSON.parse(userData).userEmail,
        },
      });
      swal({
        title: "¡Tu reserva se completo con exito!",
        text: "¿Quieres recibir un correo con todos los detalles de la misma?",
        icon: "success",
        buttons: [
          "No, no quiero recibirlo",
          "¡Si, quiero recibir todos los detalles!",
        ],
      }).then((value) => {
        if (value) {
          sendBookingEmail();
        } else {
          location.reload();
        }
      });
    } catch (error) {
      swal(
        "Error",
        "Hubo un error al registrar la reserva, por favor vuelve a intentarlo",
        "error"
      );
    }
  };

  async function sendBookingEmail() {
    await axios.post(
      `${URL}/enviarCorreo/successful/${userDataJson.userEmail}`,
      {
        email: userDataJson.userEmail,
        experience: data.name,
        dateIn: range[0].startDate,
        dateOut: range[0].endDate,
        place: data.location,
        image: data.imagePath[0].url,
      }
    );
    swal({
      title: "¡El correo fue enviado con exito!",
      text: "En tu Inbox encontraras mas detalles de tu reserva",
      icon: "success",
    }).then((value)=>{
      if(value){
        location.reload()
      }
    })
  }

  return (
    <div className="product-detail-description">
      <form className="product-detail-description1" onSubmit={handleBooking}>
        <h3>{"$" + data.price + " ARS por persona"}</h3>
        <div className="calendar-counter">
          <div className="date">
            <h4>Fechas</h4>
            <div ref={refOne}>
              <DateRange
                onChange={(item) => setRange([item.selection])}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                retainEndDateOnFirstSelection={false}
                ranges={range}
                months={1}
                direction="vertical"
                disabledDates={disabledDates}
                className={
                  showMonths
                    ? "calendarHome calendarElement"
                    : "calendarHome calendarElement hide-months"
                }
                rangeColors={["#FF8A30", "#FF8A30", "#FF8A30"]}
                color={"#FF8A30"}
                minDate={new Date()}
              />
            </div>
          </div>
        </div>
        {isAuth ? (
          <button
            className="my-button"
            onClick={(e) => {
              e.preventDefault();
              setOpenModal(true);
            }}
            disabled={
              !isAvailableDate(
                range[0].startDate,
                range[0].endDate,
                disabledDates
              )
            }
          >
            Reservar fecha
          </button>
        ) : (
          <button className="my-button" type="button" onClick={handleClick}>
            <Link>¡Comenzá tu aventura ahora!</Link>
          </button>
        )}
        {openModal && (
          <Modal
            onClick={(e) => {
              e.preventDefault();
              setOpenModal(false);
            }}
          >
            <BookingModal
              userDataJson={userDataJson}
              range={range}
              data={data}
            />
          </Modal>
        )}

        <FormErrorMsg formErrors={formErrors} />
      </form>
      <div className="product-detail-description2">
        <div>
          <h2 className="politicTitle">Detalles</h2>
          <p className="pDescription">{data.description}</p>
          <h2 className="politicTitle">Politicas</h2>
          <div className="politicsContainer">
            {data.politics.map((item) => {
              return (
                <>
                  <div key={item.id}>
                    <div className="politic-item">
                      <h5>{item.title}</h5>
                      <p className="pDescription">{item.description}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div className="product-detail-places">
        <h2>¿Qué ofrece este lugar?</h2>
        <div className="product-detail-places2">
          {data.activities.map((activity) => {
            const item = icons.find(
              (item) => item.id === activity.imagePathIconId
            );
            if (!item) {
              return null;
            }
            return (
              <div className="product-detail-places3" key={activity.id}>
                <img
                  className="product-detail-ruins"
                  src={`${item.url}`}
                  alt={`${activity.text}-icon`}
                />
                <p>{activity.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Description;
