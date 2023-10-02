import Select from "react-select";
import { getIconFromArrayOfIcons, hasError } from "../../../../../utils/utilsFn";
import { BsTrash } from "react-icons/bs";
import style from "../editProduct.module.css"

const ActivitiesInput = ({
    setAddedActivities, 
    setNewActivity, 
    addedActivities, 
    newActivity,
    icons,
    formErrors
}) => {

    const handleActivityChange = (e) => {
        const { name, value } = e.target;
        setNewActivity((prevActivity) => ({ ...prevActivity, [name]: value }));
      };
    const handleAddActivity = () => {
        setAddedActivities((prevActivities) => [...prevActivities, newActivity]);
        setNewActivity({ text: '', imagePathIconId: '' });
    };
    const handleDeleteActivity = (text) => {
        setAddedActivities(addedActivities.filter(activity => activity.text !== text))
    }
    const handleIconSelect = (selectedIconId) => {
        setNewActivity((prevActivity) => ({
          ...prevActivity,
          imagePathIconId: selectedIconId.value,
        }));
      };

    return (
        <div className={style.activitiesContainer}>
            <div className={style.activityPoliticsInputs}>
                <h4>Actividades</h4>
                <div>
                    <label htmlFor='activityText'>Texto de Actividad</label>
                    <input
                        type='text'
                        id='activityText'
                        name='text'
                        value={newActivity.text}
                        className={hasError(formErrors, 'activities') ? 'input-error' : ''}
                        onChange={handleActivityChange}
                    />
                </div>
                <div>
                    <label htmlFor='activityIcon'>Seleccionar Ícono de Actividad:</label>
                    <Select
                        id='activityIcon'
                        name='imagePathIconId'
                        className={`category-select ${hasError(formErrors, 'activities') ? 'input-error' : ''}`}
                        onChange={(value) => handleIconSelect(value)}
                        options={icons.map((icon) => ({ value: icon.id }))}
                        getOptionLabel={(imagenId) => (
                            <img
                                src={imagenId.value ? getIconFromArrayOfIcons(imagenId?.value, icons).url : ''}
                                alt={imagenId?.value}
                                width='20'
                                height='20'
                            />
                        )}
                    />
                </div>
                <div>
                    <button 
                    type='button' 
                    onClick={handleAddActivity}
                    disabled={newActivity.text === '' || newActivity.imagePathIconId === ''}
                    >
                        Añadir Actividad
                    </button>
                </div>
            </div>
            <div>
                <label>Actividades Añadidas</label>
                <ul className='added-activities-list'>
                {addedActivities.map((activity, index) => (
                    <li key={index}>
                        Texto: {activity.text}, Icono:{' '}
                        <img
                        src={
                            getIconFromArrayOfIcons(activity.imagePathIconId, icons).url
                        }
                        width='20'
                        height='20'
                        />
                    <BsTrash 
                        className='delete-activity-icon' 
                        onClick={() => handleDeleteActivity(activity.text)}/>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    )
}

export default ActivitiesInput