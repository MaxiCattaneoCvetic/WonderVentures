/* eslint-disable react/prop-types */
import { BsTrash } from "react-icons/bs";
import { hasError } from "../../../../../utils/utilsFn";

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
        <div className="activities-container">
            <div className="politic-item-container">
            <h4>Políticas del Producto</h4>
            <div className="inputFlex">
                <label htmlFor='politicTitle'>Título de Política</label>
                <input
                    type='text'
                    id='politicTitle'
                    name='title'
                    value={newPolitic.title}
                    className={hasError(formErrors, 'politics') ? 'input-error' : ''}
                    onChange={handlePoliticChange}
                    placeholder="Título de la politica"
                />
            </div>
            <div className="inputFlex">
                <label htmlFor='politicDescription'>Descripción de Política</label>
                <textarea
                    type='text'
                    id='politicDescription'
                    name='description'
                    value={newPolitic.description}
                    className={hasError(formErrors, 'politics') ? 'input-error' : ''}
                    onChange={handlePoliticChange}
                    placeholder="Descripción de la politica"
                />
            </div>
            <button type='button' onClick={handleAddPolitic} className="btnform">
                Añadir Política
            </button>
            </div>
            <div className='added-activities-list'>
            <h5>Politicas Añadidas</h5>
            {
                productData?.politics.length > 0 && 
                <div className="activity-list-container">
                    <ul >
                    {productData.politics.map((politic, index) => (
                        <li key={index} >
                        <strong>Titulo:</strong>  {politic.title}, <br></br>
                        <strong>Descripción:</strong> {politic.description}
                        <BsTrash 
                            className='delete-activity-icon' 
                            onClick={() => handleDeletePolitic(politic.title)}/>
                        </li>
                    ))}
                    </ul>
                </div>
            }
            </div>
        </div>
    )
}

export default PoliticsInput