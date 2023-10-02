/* eslint-disable react/prop-types */
import style from "./filterExp.module.css"

function Index(props) {
	const opcionesFiltro = ["Seleccione Opción", "Menor precio", "Mayor precio", "Ciudad"];

  const handleFiltroChange = (event) => {
    props.onClick(event.target.value);
  };
  
  return (
    <div>
      <span className={style.filterContainer}>
        <label>Ordenar por:</label>
        <select value={props.filterStatus} onChange={handleFiltroChange}>
          {opcionesFiltro.map((opcion, index) => (
            <option key={index} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
}

export default Index;
