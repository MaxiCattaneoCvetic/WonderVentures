import AddProduct from "../AddProduct/Index";
import logoADM from "../../../../assets/logoADM.png";
import style from "./panelADM.module.css";
import { Link } from "react-router-dom";
import MainNavigation from "../../../../layouts/MainNavigation/Index";
// import { useEffect, useState } from 'react';
// import { getCategories, getIcons } from '../../../../services/productApi';
import Spinner from "../../../../components/Spinner/Index";
import { icons, categories } from "../../../../utils/getCategories";
import ModalExperience from "../../../../components/ModalExperience/Index";
import { useState } from "react";
import FormCategory from "../../../AdminActions/components/FormCategory/AddCategory";

function Index() {
  const [isModal, setIsmodal] = useState();

  // if (icons.length === 0 || categories.length === 0) {
  //   return (
  //     <div className={"container-spinner container-spinner-full"}>
  //       <Spinner />
  //     </div>
  //   );
  // }
  const modalProps = {
    title: "Crear experiencia",
    buttonText: "Cerrar modal",
    onClick: () => {
      setIsmodal();
    },
  };
  const modalPropsCategory = {
    title: "Gestión de categorias",
    buttonText: "Cerrar modal",
    onClick: () => {
      setIsmodal();
    },
  };

  return (
    <>
      <MainNavigation
        color={"black"}
        bkColor={"var(--footerBackground)"}
        position={"fixed"}
      />
      <main className={style.backgroundPanel}>
        <div className={style.containerWelc}>
        <img src={logoADM} className={style.logoadm} alt="" />
        <h2 className={style.welcomeH2}>Bienvenido</h2>
        </div>

        <div className={style.blurContainer}>
          
        <div className={style.titlePanel}>
        <h3>Panel De</h3>
        <h2>Administrador</h2>
        </div>

        <div className={style.btnActionsAdmin}>
          <button
            className={style.verExpBTN}
            onClick={() => {
              setIsmodal(0);
            }}
          >
            Crear experiencia
          </button>
          <div>
            <Link to={"/admin/productManagement"}>
              <button className={style.verExpBTN}>
                Gestionar experiencias
              </button>
            </Link>
          </div>
          <div>
            <button
              className={style.verExpBTN}
              onClick={() => {
                setIsmodal(1);
              }}
            >
              Gestionar categorias
            </button>
          </div>
        </div>



        </div>

        {isModal === 0 && (
          <ModalExperience {...modalProps}>
            <AddProduct formSelectData={{ icons, categories }} />
          </ModalExperience>
        )}
        {isModal === 1 && (
          <ModalExperience {...modalPropsCategory}>
            <FormCategory></FormCategory>
          </ModalExperience>
        )}
      </main>
    </>
  );
}

export default Index;
