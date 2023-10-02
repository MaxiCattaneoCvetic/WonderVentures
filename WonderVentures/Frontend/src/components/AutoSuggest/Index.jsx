import { ReactSearchAutocomplete } from "react-search-autocomplete";
import "./autoSuggest.css"


function Autosuggest(props) {


	//Sttring es el valor del input y result es el resutlado que arroja
  const handleOnSearch = (string, results) => {
		//mientras que el user escriba, sin select nada el valor de la validacion
		//sera TRUE
		props.onSelected(string,true)
  };

	//el item que le haces hover
  const handleOnHover = (result) => {
    
  };


	//el item que seleccionas
  const handleOnSelect = (item) => {
		//CUANDO EL USER SELECCIONE una opcion quiere decir que no la escribe mas,
		//el valor de la validacion sera = 1
		sendItem(item,1)
  };


  function sendItem(item,value) {
    props.onSelected(item,value); 
  }

  const handleOnFocus = () => {
    console.log("Focused");
  };

	const styles = {
	listStyle: "none",
  color: "white",
  cursor: "pointer",
	backgroundColor: "#263238",
	hoverBackgroundColor: "#c0bcbc33"
		
	}

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          Experiencia: {item.name}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          Ciudad: {item.location}
        </span>
      </>
    );
  };

  return (
		<div className="suggestContainer">
    <ReactSearchAutocomplete
      items={props.products}
      onSearch={handleOnSearch}
      onHover={handleOnHover}
      onSelect={handleOnSelect}
      onFocus={handleOnFocus}
      autoFocus
      formatResult={formatResult}
      styling={styles}
			placeholder="¿A dónde vas?"
    />
		</div>
  );

}

export default Autosuggest;
