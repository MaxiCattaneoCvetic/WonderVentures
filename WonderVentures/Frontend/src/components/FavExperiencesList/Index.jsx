/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from "react";
import MainNavigation from "../../layouts/MainNavigation/Index";
import ProductList from "../ProductList/Index";
import { useEffect } from "react";
import style from "./favExperiencesList.module.css";
import FilterExperiences from "../FilterExperiences/Index";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../Spinner/Index";

const FavExperiencesList = () => {
  const [filterStatus, setFilterStatus] = useState();
  const navigate = useNavigate();
  const location = useLocation()
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      navigate('/login', {
        state:{
            previousUrl: location.pathname
        }
    })
    }
  }, [token]);

  function dataFilter(value) {
    setFilterStatus(value);
  }

  if (!token) {
    return (
      <div className={"container-spinner container-spinner-full"}>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <MainNavigation bkColor={"var(--footerBackground)"} />
      <div className={style.containerFav}>
        <div className={style["title-body-div"]}>
          <h1 className={style.textBody}>Favoritos</h1>
          <FilterExperiences
            onClick={(valu) => {
              dataFilter(valu);
            }}
            favList={false}
          />
        </div>
        <ProductList filter={filterStatus} favList={true} />
      </div>
    </>
  );
};

export default FavExperiencesList;
