/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import {
  deleteProduct,
  addData,
  getIcons,
  getCategories,
} from '../../../../services/productApi';
import style from './manageAllProducts.module.css';
import MainNavigation from '../../../../layouts/MainNavigation/Index';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { isAdminLoggedIn } from '../../../user/Login/authSlice';

const Index = ({ data }) => {
  const [products, setProducts] = useState(data);
  const [filteredProducts, setFilteredProducts] = useState(data);
  const [loading, setLoading] = useState(false);
  const [icons, setIcons] = useState([]);
  const [categories, setCategories] = useState([])
  const [categoryFilter, setCategoryFilter] = useState("")
  const codigoAdm = import.meta.env.VITE_REACT_APP_CODE_ADM;




  const isAdmin = useSelector(isAdminLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if(!isAdmin){
      navigate('/')
    }
  }, [])

  useEffect(() => {
    const fetchIcons = async () => {
      const icons = await getIcons();
      setIcons(icons);
      const categories = await getCategories()
      setCategories(categories)
    };
    fetchIcons();
  }, []);

  const handleCategoryFilter = (value) => {
    if (value) {
      const filtered = products.filter((p) => p.category.name === value);
      setFilteredProducts(filtered);
      setCategoryFilter(value)
    } else if (value === '') {
      setCategoryFilter(value)
      setFilteredProducts(products);
    }
  };

  const deleteHandler = async (id) => {
    try {
      swal("Por seguridad tu cuenta de administrador necesita una clave para hacer esto, ingresa la clave o pidele a Maxi que te brinde una:", {
        content: "input",
      })
      .then((value) => {
        if(value === codigoAdm){
          swal({
            title: `Estas seguro de eliminar el producto con id:${id}`,
            text: "una vez eliminado no podras recuperarlo",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              deleteProduct(id);
              setLoading(true);
              const filteredProducts = products.filter((product) => id !== product.id);
              setProducts(filteredProducts);
              setLoading(false);
              swal("Producto eliminado correctamente!", {
                icon: "success",
              })
              .then((value)=>{
                if(value){
                  location.reload()
                }
              })
            } else {
              swal("¡El producto esta a salvo!");
              return
            }
          });
        }else if (value != codigoAdm){
          swal("Codigo incorrecto", "El codigo que ingresaste no es valido", "error")
          .then((value)=>{
              if(value){
                location.reload()
                return
              }
          })
        }
      })
    }catch(err){
      console.log(err)
    }

  };

  const categoryChangeHandler = async (product, value) => {
    setLoading(true)
    await addData('PUT', { ...product, category: value.value }, 'update');
    const updatedProducts = products.map((p) =>
      p.id === product.id
        ? {
            ...p,
            category: value.value,
          }
        : p
    );
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setLoading(false);
  };

  let content;
  if (loading || icons.length === 0 || categories.length === 0) {
    content = <p>LOADING.......</p>;
  } else {
    content = (
      <>
        <h2 className={style.title}>
          Lista de Experiencias
        </h2>
        <div className={style.containerSelect}>
          <label>Filtrar por Categoría</label>
          <select value={categoryFilter} onChange={(e) => handleCategoryFilter(e.target.value)}>
            <option value="">Seleccione Categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {
            categoryFilter != "" &&
            <button
              onClick={() => handleCategoryFilter("")}
              className={style.deleteFilterBTN}
              >
              Eliminar filtro
            </button>
          }
        </div>
        {filteredProducts?.length ? (
          filteredProducts.map((product) => {
            return (
              <div key={product.id} className={style.productContainer} >
                <div className={style.productBox}>
                  <div className={style.infoBox}>
                    <p className={style.idBox}>Id:{product.id}</p>
                    <Link className={style.pa} to={`productDetails/${product.id}`}>
                      <p >{product.name}</p>
                    </Link>
                  </div>
                  <div>
                    <Select
                      id='category'
                      required
                      name='category'
                      onChange={(value) => categoryChangeHandler(product, value)}
                      className={'category-select'}
                      value={{value: product.category}}
                      options={categories.map(category => ({value: category}))}
                      getOptionLabel={(category) => (
                        <div>
                          <img
                            src={category?.value?.icon.url}
                            alt={''}
                            width='20'
                            height='20'
                          />
                          {category?.value?.name}
                        </div>
                      )}
                    />
                  </div>
                  <div className={style.panelBox}>
                    <Link
                      to={`/admin/edit/${product.id}`}
                      className={style.editBTN}
                    >
                      Editar
                    </Link>
                    <button
                      className={style.deleteBTN}
                      onClick={() => deleteHandler(product.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <p>{'No products found!'}</p>
          </div>
        )}
        <div className={style.btnPanel}>
          <button className={style.deleteBTN}>
            <Link to={'/'}>Volver al Home</Link>
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <MainNavigation
        bkColor={'var(--footerBackground)'}
        position={'relative'}
      />
      <section className={style.container}>
      {content}
      </section>
    </>
  );
};

export default Index;
