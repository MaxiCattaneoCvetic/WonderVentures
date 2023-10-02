/* eslint-disable react/prop-types */
import "./productDetail.css";
import { getIcons } from "../../../src/services/productApi";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MainNavigation from "../../layouts/MainNavigation/Index";
import Spinner from "../../components/Spinner/Index";
import axios from "axios";
import { URL } from "../../utils/constants";
import Reviews from "./Reviews";
import Description from "./Description";
import PrincipalDetails from "./PrincipalDetails";

const Index = ({ data }) => {
  const [icons, setIcons] = useState([]);
  const [formErrors, setFormErrors] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getIcons()
      .then((iconsData) => {
        setIcons(iconsData);
      })
      .catch((error) => {
        console.error("Error fetching icons:", error);
      });

    const fetchExperienceData = async () => {
        try {
          const { data: reviews } = await axios.get(
              `${URL}/reviews/experience/${data.id}`
          );
          setReviews(reviews);
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

    }, [data.id, setFormErrors]);

  return (
    <>
      <MainNavigation bkColor={"var(--footerBackground)"} />
      <div className="container-product-detail">
        {icons.length === 0 ? (
          <div className="spinner-container">
            <Spinner />
          </div>
        ) : (
          <div className="product-detail-container">
            <PrincipalDetails data={data} reviews={reviews}/>
            <Description 
              data={data} 
              formErrors={formErrors} 
              setFormErrors={setFormErrors}
              icons={icons}
              />
            <Reviews reviews={reviews}/>
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
