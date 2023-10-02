/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchProductsName } from '../../services/productApi';
import Card from '../../components/Card/Index';
import ReactPaginate from 'react-paginate';
import style from './productList.module.css';
import Spinner from '../../components/Spinner/Index';
import { useDispatch, useSelector } from 'react-redux';
import { FcSearch } from 'react-icons/fc';
import swal from 'sweetalert'


const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const jsonData = useSelector(state => state.auth.user);
  const [userData, setUserData] = useState(JSON.parse(jsonData))
  const itemsPerPage = 10;
  const validation = props.validation;
  const filterStatus = props.filter
  const {experience, startDate, endDate} = props.filterExperience ? props.filterExperience : "";
  const categoryFilterValue = props.categoryFilter

  useEffect(() => {
    setUserData(JSON.parse(jsonData))
  }, [jsonData])

  useEffect(() => {
    if(!loading){
      props.setScrollAnimation(true)
    }
  }, [currentPage])

//Si la validacion es true, entonces quiere decir que se utilizo la barra de navegacion
// si la validacion es false, quiere decir que el usuario utilizo el filtro de precios

  useEffect(() => {
    (async function () {
      try {
        let data

        if(validation){
          // Si solo hizo una búsqueda
            if(experience.length >= 2){
              data = await fetchProductsName(experience, startDate, endDate);
              if(categoryFilterValue !== "allcategory"){
                data = data.filter((p) => p.category.name === categoryFilterValue);
                props.sendlength(data.length)
              }
              setTotalPages(Math.ceil(data.length / itemsPerPage))

            }else{
              swal("Tu busqueda debe tener por lo menos 2 caracteres");
            }

        }else if(!validation){
          if(props.favList && userData.favExperiences){
            data = userData.favExperiences
          }else {
            if(categoryFilterValue !== "allcategory"){
              data = props.products.filter((p) => p.category.name === categoryFilterValue);
              props.sendlength(data.length)
            }else{
              data = props.products
            }
          }
          setTotalPages(Math.ceil(data.length / itemsPerPage));
          setLoading(false);
        }

        switch (filterStatus) {
          case 'Menor precio':
            setProducts(data.sort((a, b) => a.price - b.price))
            break;
          case 'Mayor precio':
            setProducts(data.sort((a, b) => b.price - a.price))
            break;
          case 'Ciudad':
            setProducts(data.sort((a, b) => a.location.localeCompare(b.location)));
            break;
          default:
            setProducts(data);
        }

      } catch (error) {
        console.log('Error en el pedido, detalle: ' + error);
      }
    })();
  }, [userData, props, experience, validation, categoryFilterValue, filterStatus]);


  

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = products.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  if (loading) {
    // Muestra el spinner mientras se cargan los productos
    return (
      <div className={'container-spinner'}>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {products?.length ? (
        <section className={style.productListContainer}>
          <div className={`${style['product-list-grid']} ${props.favList ? style.favList : '' }`}>
            {subset.map((product) => (
              <Card 
              key={product.id} 
              id={product.id} 
              product={product}
              favList={props.favList}
              userData={userData}
              dispatch={dispatch}
              />
              ))}
          </div>
          <ReactPaginate
            pageCount={totalPages}
            onPageChange={handlePageChange}
            forcePage={currentPage}
            previousLabel='<'
            nextLabel='>'
            breakLabel='...'
            containerClassName={'pagination'}
            previousLinkClassName={'pagination__link'}
            nextLinkClassName={'pagination__link'}
            disabledClassName={'pagination__link--disabled'}
            activeClassName={'pagination__link--active'}
          />
          
        </section>
      ) : (
        <section>
          <div>
            {props.favList ? 
            <div className={style.noFav}>
              <FcSearch className={style.iconSearch}/>
              Aun no tienes experiencias favoritas
            <br></br>
            <span>¡vuelve al <a href="/">inicio</a> y elige alguna!</span>
            </div> 
            :
            <div className={style.noFav}>
              ¡No se encontraron productos!
              <FcSearch className={style.iconSearch}/>
            </div>}
          </div>
        </section>
      )}
    </>
  );
};

export default ProductList;
