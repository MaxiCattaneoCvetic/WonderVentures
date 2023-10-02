/* eslint-disable react/prop-types */
import Select from "react-select";
import {
  getIconFromArrayOfIcons,
  hasError,
} from "../../../../../utils/utilsFn";
import { BsTrash } from "react-icons/bs";

const ActivitiesInput = ({
  setAddedActivities,
  setNewActivity,
  addedActivities,
  newActivity,
  icons,
  formErrors,
}) => {
  const handleActivityChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prevActivity) => ({ ...prevActivity, [name]: value }));
  };
  const handleAddActivity = () => {
    setAddedActivities((prevActivities) => [...prevActivities, newActivity]);
    setNewActivity({ text: "", imagePathIconId: "" });
  };
  const handleDeleteActivity = (text) => {
    setAddedActivities(
      addedActivities.filter((activity) => activity.text !== text)
    );
  };
  const handleIconSelect = (selectedIconId) => {
    setNewActivity((prevActivity) => ({
      ...prevActivity,
      imagePathIconId: selectedIconId,
    }));
  };

  return (
    <div className="activities-container">
      <div className="activity-item-main">
        <h4>Actividades de la experiencia</h4>
        <div className="activities-item inputFlex">
          <label htmlFor="activityText">Nombre</label>
          <input 
            type="text"
            id="activityText"
            name="text"
            value={newActivity.text}
            className={hasError(formErrors, "activities") ? "input-error" : ""}
            onChange={handleActivityChange}
            placeholder="Nombre de la actividad"
          />
        </div>
        <div>
          <label htmlFor="activityIcon">Ícono de Actividad:</label>
          <Select
            id="activityIcon"
            name="imagePathIconId"
            className={`category-select ${
              hasError(formErrors, "activities") ? "input-error" : ""
            }`}
            onChange={(value) => handleIconSelect(value)}
            value={newActivity.imagePathIconId}
            options={icons.map((icon) => ({ value: icon.id }))}
            getOptionLabel={(imagenId) => (
              <div>
                <img
                  src={getIconFromArrayOfIcons(imagenId.value, icons).url}
                  alt={imagenId.value}
                  width="20"
                  height="20"
                />
              </div>
            )}
          />
        </div>
        <button
          className="btnform"
          type="button"
          onClick={handleAddActivity}
          disabled={
            newActivity.text === "" || newActivity.imagePathIconId === ""
          }
        >
          Añadir Actividad
        </button>
      </div>
      <div className="added-activities-list">
      <h5>Actividades Añadidas</h5>
        {addedActivities.length > 0 && (
          <div className="activity-list-container">
            <ul>
              {addedActivities.map((activity, index) => (
                <li key={index}>
                  Texto: {activity.text}, Icono:{" "}
                  <img
                    src={
                      getIconFromArrayOfIcons(
                        activity.imagePathIconId.value,
                        icons
                      ).url
                    }
                    width="20"
                    height="20"
                  />
                  <BsTrash
                    className="delete-activity-icon"
                    onClick={() => handleDeleteActivity(activity.text)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitiesInput;
