import { BsTrash } from "react-icons/bs";
import { hasError } from "../../../../../utils/utilsFn";
import style from "../editProduct.module.css"


const PoliticsInput = ({
    setNewPolitic,
    setProductData,
    newPolitic,
    productData,
    formErrors
}) => {

    const handlePoliticChange = (e) => {
        const { name, value } = e.target;
        setNewPolitic((prevPolitic) => ({ ...prevPolitic, [name]: value }));
      };
    const handleAddPolitic = () => {
        setProductData((prevData) => ({
            ...prevData,
            politics: [...prevData.politics, newPolitic]
        }));
        setNewPolitic({ title: '', description: '', });
    };
    const handleDeletePolitic = (title) => {
        setProductData((prevData) => ({
            ...prevData,
            politics: prevData.politics.filter(politic => politic.title !== title)
        }))
    }

    return (
        <div className={style.activitiesContainer}>
            <div className={style.activityPoliticsInputs}>
                <h4>Políticas de la Experiencia</h4>
                <div>
                    <label htmlFor='politicTitle'>Título de Política</label>
                    <input
                        type='text'
                        id='politicTitle'
                        name='title'
                        value={newPolitic.title}
                        className={hasError(formErrors, 'politics') ? 'input-error' : ''}
                        onChange={handlePoliticChange}
                    />
                </div>
                <div>
                    <label htmlFor='politicDescription'>Descripción de Política</label>
                    <input
                        type='text'
                        id='politicDescription'
                        name='description'
                        value={newPolitic.description}
                        className={hasError(formErrors, 'politics') ? 'input-error' : ''}
                        onChange={handlePoliticChange}
                    />
                </div>
                <div>
                    <button type='button' onClick={handleAddPolitic}>
                        Añadir Política
                    </button>
                </div>
            </div>
            <div>
                <label>Políticas Añadidas</label>

                {
                    productData.politics?.length ? (

                    <ul className='added-activities-list'>
                    {productData?.politics?.map((politic, index) => (
                        <li key={index}>
                        Texto: {politic.title}, 
                        Descripción: {politic.description}
                        <BsTrash 
                            className='delete-activity-icon' 
                            onClick={() => handleDeletePolitic(politic.title)}/>
                        </li>
                    ))}
                    </ul>
                    ) : (
                        <p>No hay políticas añadidas</p>
                    )
                }
                
            </div>
        </div>
    )
}

export default PoliticsInput