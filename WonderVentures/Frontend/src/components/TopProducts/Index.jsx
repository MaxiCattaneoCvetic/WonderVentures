/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Card from "../Card/Index";
import style from "./topProducts.module.css";

function TopProducts({products}) {
  let dataProduct = products;
  const [contador, setContador] = useState(0);
  const [destacados, setDestacados] = useState([]);

  
  //si queremos que se rendericen mas productos, cambiamos la variable esta
  let limite = 3;

  useEffect(() => {
    setDestacados(dataProduct.slice(0, limite));
  }, [dataProduct]);

  useEffect(() => {
    const interval = setInterval(() => {
      setContador((prevContador) => (prevContador + 1) % limite);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={style.topContainer}>
        {destacados?.length > 0 ? (
          <Card
            key={destacados[contador].id}
            id={destacados[contador].id}
            product={destacados[contador]}
          />
          
        ) : (
          ""
        )}
        <div className={style.btnCarrousel}>
        <button className={style[`current${contador}0`]}
            onClick={() => {
              setContador(0);
            }}
          >
            
          </button>
          <button className={style[`current${contador}1`]}
            onClick={() => {
              setContador(1);
            }}
          >
            
          </button>
          <button className={style[`current${contador}2`]}
            onClick={() => {
              setContador(2);
            }}
          >
          </button>
        </div>
      </div>
    </>
  );
}

export default TopProducts;
