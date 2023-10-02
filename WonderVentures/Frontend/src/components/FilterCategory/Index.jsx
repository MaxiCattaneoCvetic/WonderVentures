/* eslint-disable react/prop-types */
import style from './filterCategory.module.css'
import {  categories } from "../../utils/getCategories";

function Index(props) {

  const handleCategoryFilter = (value) => {
    props.onClick(value);
  };


  return (
    
    <div className={style["container"]}>
      <label>Filtrar por Categoría</label>
      <select value={props.valueCategory} onChange={(e) => handleCategoryFilter(e.target.value)}>
        <option value="allcategory">Seleccione Categoría</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      
    </div>
  );
}

export default Index;
