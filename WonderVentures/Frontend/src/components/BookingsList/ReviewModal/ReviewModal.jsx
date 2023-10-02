import { useEffect, useState } from "react";
import "./reviewModal.css";
import { BsStar, BsStarFill, BsXLg } from "react-icons/bs";
import { addData } from "../../../services/productApi";
import axios from "axios";
import { URL } from "../../../utils/constants";
import swal from "sweetalert";

const ReviewModal = ({ booking, setModalActive }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      comment: review,
      score: rating,
      user: {
        id: booking.user.id,
      },
      experience: {
        id: booking.experience.id,
      },
    };
    try {
      const res = await axios.post(`${URL}/reviews`, data);
      swal({
        title: "¡Tu reseña se agrego correctamente!",
        text: "Muchas gracias",
        icon: "success",
      }).then((value) => {
        if (value) {
            location.reload()
        } 
      });
    } catch (error) {
      swal({
        title: "ERROR",
        text: "Hubo un problema al intentar cargar tu reseña, intenta en unos minutos..",
        icon: "error",
        buttons: true,
      });
    }
  };

  return (
    <>
      <form className="review-modal-container" onSubmit={handleSubmit}>
        <BsXLg
          className="close-review-modal"
          onClick={() => setModalActive(false)}
        />
        <div className="star-rating">
          <h4>Puntuación</h4>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                {index <= (hover || rating) ? (
                  <BsStarFill className="star-icon" />
                ) : (
                  <BsStar className="star-icon" />
                )}
              </button>
            );
          })}
        </div>
        <textarea
          name=""
          id=""
          rows="8"
          placeholder="Deje un comentario de su experiencia (opcional)"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <button className="btn-primary submit-review" type="submit">
          Publicar
        </button>
      </form>
      <div className="blur-background"></div>
    </>
  );
};

export default ReviewModal;
