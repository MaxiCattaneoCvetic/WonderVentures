/* eslint-disable react/prop-types */
import ImageModal from "../imageViewer/imageViewer";
import { Link } from "react-router-dom";
import assets from "../../assets/assets";
const PrincipalDetails = ({data, reviews}) => {
    const averageReviewScore =
    reviews.reduce((total, next) => total + next.score, 0) / reviews.length;
    
    return (
        <>
            <div className="product-detail-header">
                <div className="product-detail-title">
                    <h1 className="visitaH1">{`Visitá ${data.name}`}</h1>
                    <Link to="/">
                        <button className="back">
                        <img
                            className="back-arrow"
                            src={assets.back}
                            alt="back-arrow"
                        />
                        Volver
                        </button>
                    </Link>
                </div>
                <div className="product-detail-subheader">
                    <div>
                        <img
                            className="product-detail-star"
                            src={assets.star}
                            alt="star-recomendation"
                        />
                        <h5>
                        {reviews.length > 0
                            ? `${averageReviewScore} (${reviews.length})`
                            : "Sin Reseñas"}
                        </h5>
                    </div>
                    <div>
                        <img
                            className="product-detail-location"
                            src={assets.location}
                            alt="location"
                        />
                        <h5>{data.location}</h5>
                    </div>
                    <h5>{"Categoria: " + data.category.name}</h5>
                </div>
            </div>
            <div className="product-detail-gallery">
                <div className="product-detail-gallery-principal">
                <img
                    src={`${data.imagePath[0]?.url ?? "defaultPath"}`}
                    className="principal-image"
                    alt="imagen-principal"
                />
                </div>
                <div className="product-detail-gallery-cont">
                {data.imagePath.slice(0, 4).map((img) => (
                    <div key={img?.url} className="content-product-image">
                    <img
                        className="product-image"
                        src={`${img?.url}`}
                        alt="Imagen"
                    />
                    </div>
                ))}
                </div>
            </div>
            <div className="see-more-content">
                <ImageModal images={data.imagePath} />
            </div>
        </>
    )
}

export default PrincipalDetails
