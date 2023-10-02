/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import styles from "./searchBar.module.css";
import Autosuggest from "../AutoSuggest/Index";
import { useEffect } from "react";
import { DateRange } from "react-date-range";
import { addDays} from "date-fns";
import swal from 'sweetalert';


function Index(props) {
  const products = props.products
  const [selectedItem, setSelectedItem] = useState("");
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  const refOne = useRef(null);
  const [showMonths, setShowMonths] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
    document.querySelector('.rdrDateDisplayWrapper').addEventListener("click", toggleMonths, true)
    if(selectedItem === ''){
      props.setSearchValidation(false)
    }
    return () => {
      document.removeEventListener("keydown", hideOnEscape);
      document.removeEventListener("click", hideOnClickOutside);
    };
  }, [selectedItem]);


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

  const handleItemSelected = (item, valor) => {
    //Esta funcion recibe el valor del Autocomplete,
    // si el valor esta en true > el usuario ingreso manualmente la busqueda
    // si el valor esta en 1 > el usuario selecciono la lista desplegable
    if (valor === 1) {
      setSelectedItem(item.name);
    } else if (valor === true) {
      setSelectedItem(item);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSelectedItem("");
  };

  const handleSearch = () => {
    if(selectedItem && range[0].startDate && range[0].endDate){
      props.onClick({
        experience: selectedItem,
        startDate: range[0].startDate.toISOString().split('T')[0],
        endDate: range[0].endDate.toISOString().split('T')[0]
      });
    }else{
      swal("Recorda completar fecha y destino antes de continuar");

    }
  };

  const toggleMonths = () => {
    setShowMonths(!showMonths); 
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles["navbar-btn-container"]}>
          <div className={styles["navbar-item"]}>
            <label>Nombre de experiencia o ciudad</label>
            <div className={styles.inputAutoSuggest}>
              <Autosuggest
                products={products}
                onSelected={handleItemSelected}
              ></Autosuggest>
            </div>
          </div>
          <div className={styles["navbar-item"]}>
            <label>Selecciona tu fecha de partida</label>
            <div ref={refOne}>
              <DateRange
                onChange={(item) => setRange([item.selection])}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                retainEndDateOnFirstSelection={false}
                ranges={range}
                months={1}
                direction="vertical"
                className={showMonths ? 'calendarHome' : 'calendarHome hide-months'}
                rangeColors={["#FF8A30", "#FF8A30", "#FF8A30"]}
                color={"#FF8A30"}
                minDate={new Date()}
              />
            </div>
          </div>

        </div>
        <div className={styles["navbar-buttons"]}>
          <button onClick={handleSearch}>Buscar</button>
          <button onClick={handleReset}>Volver</button>
        </div>
      </nav>

      <hr />
      <div className={styles.bestOffert}>
        <h2>Las mejores ofertas de viaje</h2>
        <h3>Cupones y descuentos cada semana</h3>
      </div>
    </>
  );
}

export default Index;
