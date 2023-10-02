import '../productDetail/productDetail.css';
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // Importa los estilos del DateRangePicker
import 'react-date-range/dist/theme/default.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import assets from '../../assets/assets';

function ProductDetail() {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  const [open, setOpen] = useState(false);

  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    console.log(e.key);
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <>
      <div className='product-detail-container'>
        <div className='product-detail-header'>
          <h1>Visitá la Cordillera de los Andes</h1>
          <div className='product-detail-subheader'>
            <div className='product-detail-subheader'>
              <img
                className='product-detail-star'
                src={assets.star}
                alt='star-recomendation'
              />
              <h5>4.9 (540)</h5>
              <img
                className='product-detail-location'
                src={assets.location}
                alt='location'
              />
              <h5>Mendoza, Argentina</h5>
            </div>
            <Link to='/'>
              <button className='back'>
                <img
                  className='back-arrow'
                  src={assets.back}
                  alt='back-arrow'
                />
                Volver
              </button>
            </Link>
          </div>
        </div>
        <div className='product-detail-gallery'>
          <Carousel showArrows={true} infiniteLoop={true}>
            <div>
              <img
                className='product-image'
                src={assets.imagenCordillera}
                alt='Producto'
              />
              <img
                className='product-image'
                src={assets.imagenCordillera}
                alt='Producto'
              />
            </div>
            <div>
              <img
                className='product-image'
                src={assets.imagenCordillera}
                alt='Producto'
              />
            </div>
            <div>
              <img
                className='product-image'
                src={assets.imagenCordillera}
                alt='Producto'
              />
            </div>
            <div>
              <img
                className='product-image'
                src={assets.imagenCordillera}
                alt='Producto'
              />
            </div>
            <div>
              <img
                className='product-image'
                src={assets.imagenCordillera}
                alt='Producto'
              />
            </div>
          </Carousel>
        </div>
        <div className='product-detail-description'>
          <div className='product-detail-description1'>
            <h3>$100 USD por persona</h3>
            <div className='calendar-counter'>
              <div className='date'>
                <h4>Fechas</h4>
                <input
                  value={`${format(
                    range[0].startDate,
                    'MM/dd/yyyy'
                  )} a ${format(range[0].endDate, 'MM/dd/yyyy')}`}
                  readOnly
                  className='inputBox'
                  onClick={() => setOpen((open) => !open)}
                />
                <div ref={refOne}>
                  {open && (
                    <DateRange
                      onChange={(item) => setRange([item.selection])}
                      editableDateInputs={true}
                      moveRangeOnFirstSelection={false}
                      ranges={range}
                      months={1}
                      direction='horizontal'
                      className='calendarElement'
                    />
                  )}
                </div>
              </div>
              <div className='counter'>
                <h4>Participantes</h4>
                <input
                  type='number'
                  className='numberPerson'
                  placeholder='Cantidad de personas'
                  min='1'
                  max='10'
                />
              </div>
            </div>
            <button className='my-button'>Reservar fecha</button>
          </div>
          <div className='product-detail-description2'>
            <div className='product-detail-experience'>
              <h2>Experiencia Ofrecida por Mendoza Turismo</h2>
              <h3>Detalles</h3>
              <p>
                Embárcate en un viaje inolvidable a través de la asombrosa
                Cordillera de los Andes. Desde exuberantes valles hasta cumbres
                nevadas, experimentarás la belleza en su máxima expresión.
                Descubre la cultura local, contempla el majestuoso Dique
                Potrerillos y maravíllate con atardeceres sobre picos
                imponentes. Únete a nosotros para una experiencia que te
                conectará con la grandeza de la naturaleza. ¡Bienvenido a
                Mendoza!
              </p>
            </div>
            <div className='product-detail-places'>
              <h2>¿Qué Harás?</h2>
              <div className='product-detail-places2'>
                <div className='product-detail-places3'>
                  <img
                    className='product-detail-ruins'
                    src={assets.ruins}
                    alt='ruins-places'
                  />
                  <p>Visita al Puente del Inca</p>
                </div>
                <div className='product-detail-places3'>
                  <img
                    className='product-detail-ruins'
                    src={assets.mountain}
                    alt='mountain-places'
                  />
                  <p>Mirador Cerro Aconcagua</p>
                </div>
                <div className='product-detail-places3'>
                  <img
                    className='product-detail-ruins'
                    src={assets.bridge}
                    alt='bridge-places'
                  />
                  <p>Visita al Puente Colgante de Cacheuta</p>
                </div>
                <div className='product-detail-places3'>
                  <img
                    className='product-detail-ruins'
                    src={assets.food}
                    alt='food-places'
                  />
                  <p>Almuerzo en Dique Potrerillos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
