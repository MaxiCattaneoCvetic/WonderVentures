import { getCategories, getIcons } from "../services/productApi";

let icons = {};
let categories = [];


async function fetchData() {
  try {
    const fetchedIcons = await getIcons();
    const fetchedCategories = await getCategories();
    
    icons = fetchedIcons;
    categories = fetchedCategories;



  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
}


fetchData();

export {icons,categories }