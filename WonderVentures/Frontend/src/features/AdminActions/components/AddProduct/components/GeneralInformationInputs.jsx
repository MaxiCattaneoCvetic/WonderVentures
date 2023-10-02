import { hasError } from "../../../../../utils/utilsFn";

const GeneralInformationInputs = ({
  productData,
  handleChange,
  formErrors,
}) => {
  return (
    <>
      <div className="gral-info-div-main">
        <div className="inputFlex">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={productData.name}
            required
            className={hasError(formErrors, "name") ? "input-error" : ""}
            placeholder="Nombre de la experiencia"
          />
        </div>
        <div className="inputFlex">
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            onChange={handleChange}
            value={productData.price}
            required
            className={hasError(formErrors, "price") ? "input-error" : ""}
            placeholder="Precio"
          />
        </div>

      <div className="gral-info-div">
        <div className="inputFlex">
          <label htmlFor="location">Ciudad</label>
          <input
            type="text"
            id="location"
            name="location"
            onChange={handleChange}
            value={productData.location}
            required
            className={hasError(formErrors, "location") ? "input-error" : ""}
            placeholder="Ciudad de la experiencia"
          />
        </div>
      </div>
      </div>
    </>
  );
};

export default GeneralInformationInputs;
