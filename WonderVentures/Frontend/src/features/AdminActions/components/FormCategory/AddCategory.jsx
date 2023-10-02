import { useState } from "react";
import Select from "react-select";
import Spinner from "../../../../components/Spinner/Index";
import axios, { AxiosError } from "axios";
import validateCategory from "../../../../utils/formValidators/validateCategory";
import FormErrorMsg from "../../../../layouts/FormErrorMsg/Index";
import { hasError } from "../../../../utils/utilsFn";
import { URL } from "../../../../utils/constants";
import style from "./newCategory.module.css";
import RemoveCategory from "./RemoveCategory"
import {icons,categories} from "../../../../utils/getCategories"
import swal from 'sweetalert';



const AddCategory = () => {
  const [data, setData] = useState({
    id:1,
    name: "",
    description: "",
    icon: {
      value: "",
      url: "",
      identificador: "",
    },
  });

  const [formErrors, setFormErrors] = useState([]);


  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleIconSelect = (value) => {
    setData({
      ...data,
      icon: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValidCategory, dataErrors } = validateCategory(data);
    if (isValidCategory) {
      try {
        data.icon.id = data.icon.value;
        const res = await axios.post(`${URL}/category`, data);
        if (res.status === 200) {
          swal("Categoría creada con éxito", "se creo la categoria " + data.name + " ", "success")
          .then((value)=>{
            if(value){
              location.reload();
            }
          })
        }
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          if (error.data) {
            setFormErrors([
              {
                msg: error.message + ": " + error.response.data,
              },
            ]);
          } else {
            setFormErrors([
              {
                msg: error.message,
              },
            ]);
          }
        }
      }
      setFormErrors([]);
    } else {
      setFormErrors(dataErrors);
    }
  };

  if (icons.length === 0) {
    return (
      <div className={"container-spinner"}>
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <section className={style.containerFormCategory}>
        <form onSubmit={handleSubmit}>
          <div className={style.containerForm}>
          <div >
            <h2 className={style.titleCategoryManager}>Crear nuevas categorias</h2>
          <div>
          <label className={style.divLabel} >Ingresa el nombre de la categoria
          <textarea
            type="text"
            name="name"
            required
            value={data.name}
            onChange={handleChange}
            placeholder="Nombre de la Categoría"
            className={hasError(formErrors, "name") ? "input-error" : ""}
          />
          </label>
          </div>
          <div >
          <label className={style.divLabel} >Ingresa el detalle de la categoria
          <textarea
            type="text"
            name="description"
            value={data.description}
            onChange={handleChange}
            required
            className={hasError(formErrors, "description") ? "input-error" : ""}
            placeholder="Descripción de la Categoría"
          />
          </label>
          </div>
          </div>




          <div className={style.divLabel}>
            <label htmlFor="activityIcon">Selecciona el icono de la categoria</label>
            <Select
              id="activityIcon"
              name="icon"
              required
              className={`category-select ${
                hasError(formErrors, "icon") ? "input-error" : ""
              }`}
              onChange={(value) => handleIconSelect(value)}
              options={icons.map((icon) => ({
                value: icon.id,
                url: icon.url,
                identificador: icon.identificador,
              }))}
              getOptionLabel={(imagenId) => (
                <div>
                  <img
                    src={imagenId.url}
                    alt={imagenId.identificador}
                    width="20"
                    height="20"
                  />
                </div>
              )}
            />
            <button className={"btn-primary"}>Agregar Categoría</button>
          </div>
          </div>
          <FormErrorMsg formErrors={formErrors} />
        </form>
        <div className={style.containerDeleteCategory}>
        <h2 className={style.titleCategoryManager}>Eliminar categorias</h2>
          <RemoveCategory categories={categories} />
        </div>
      </section>
    </>
  );
};

export default AddCategory;
