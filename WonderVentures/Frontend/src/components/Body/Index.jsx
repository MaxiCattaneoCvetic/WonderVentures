import ProductList from "../ProductList/Index";
import SearchBar from "../SearchBar/Index";
import style from "./body.module.css";
import FilterExperiences from "../FilterExperiences/Index";
import { useEffect, useState } from "react";
import TopProducts from "../TopProducts/Index";
import { fetchProducts } from "../../services/productApi";
import { useRef } from "react";
import FilterCategory from "../../components/FilterCategory/Index";
import Review from "../Review/Index";

function Index() {
  const [filterStatus, setFilterStatus] = useState("Seleccione Opción");
  const [filterExperience, setFilterExperience] = useState({
    experience: '',
    startDate: '',
    endDate: ''
  });
  const [searchValidation, setSearchValidation] = useState(false);
  const [products, setProducts] = useState([]);
  const targetElementRef = useRef(null); // Referencia al elemento objetivocon
  const [valueCategory, setValueCategory] = useState("allcategory");
  const [totalLength, setTotalLength] = useState();
  const [scrollAnimation, setScrollAnimation] = useState(false);

  useEffect(() => {
    // Luego de establecer los productos, desplaza suavemente al usuario al elemento objetivo
    if (targetElementRef.current && scrollAnimation) {
      targetElementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
      setScrollAnimation(false);
    }
  }, [scrollAnimation]);

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };
    if (!searchValidation) {
      fetchData();
    }
  }, [searchValidation, valueCategory]);



  function lookUpExperience(value) {
    setSearchValidation(true);
    setScrollAnimation(true);
    setFilterExperience(value);
  }

  function filterCategory(value) {
    setValueCategory(value);
  }


  return (
    <>
      <SearchBar
        onClick={(value) => {
          lookUpExperience(value);
        }}
        setSearchValidation={setSearchValidation}
        favList={false}
        products={products}
      ></SearchBar>

      <div className={style["title-body-div"]}>
        <div className={style.filtersContainer}>
          <h1 className={style.textBody}>Nuestas experiencias</h1>
          <div className={style.filterItem}>
            <div className={style.categoryFilterContainer}>
              <FilterCategory
                data={products}
                onClick={(value) => {
                  filterCategory(value);
                }}
                valueCategory={valueCategory}
                ></FilterCategory>
              {
                valueCategory != "allcategory" &&
                <button
                  onClick={() => setValueCategory("allcategory")}
                  className={style.deleteFilterBTN}
                  >
                  Eliminar filtro
                </button>
              }
            </div>
            <div className={style.categoryFilterContainer}>
              <FilterExperiences
                onClick={(value) => {
                  setFilterStatus(value);
                }}
                filterStatus={filterStatus}
                />
              {
                  filterStatus !== "Seleccione Opción" &&
                  <button
                    onClick={() => setFilterStatus("Seleccione Opción")}
                    className={style.deleteFilterBTN}
                    >
                    Eliminar filtro
                  </button>
                }
            </div>
          </div>
          {valueCategory != "allcategory" && (
            <div>
              Encontramos ({totalLength}) experiencias con la categoria{" "}
              {valueCategory}
            </div>
          ) }
        </div>
      </div>
      <div ref={targetElementRef}></div>
      <section className={style.container}>
        <div className={style.mainContainer}>
          <ProductList
            filter={filterStatus}
            filterExperience={filterExperience}
            validation={searchValidation}
            setValidation={setSearchValidation}
            products={products}
            favList={false}
            categoryFilter={valueCategory}
            sendlength={(value) => {
              setTotalLength(value);
            }}
            setScrollAnimation={setScrollAnimation}
          ></ProductList>
        </div>
      </section>

      <section className={style.mainContainerTop}>
        <h2 className={style.textBody}>
          ¡Visita nuestros productos destacados!
        </h2>
        <div className={style["title-body-div"]}>
          <TopProducts products={products} />
        </div>
        </section>
        <div>
        <div className={style["title-body-div"]}>
            <h2 className={style.textBody}>Nuestras mejores experiencias</h2>
          </div>
        </div>
        <Review />

    </>
  );
}

export default Index;
