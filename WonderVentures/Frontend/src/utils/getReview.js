import { getReview } from "../services/reviewApi";


let reviews = [];


async function fetchReview() {
  try {
    const fetchReview = await getReview();
    reviews = fetchReview;

  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
}


fetchReview();

export { reviews }