import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./ProductList.css";
import Product from "../Product/Product";

const ProductList = ({ products }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {products.map(product => (
        <div key={product.id}>
          <Product product={product} />
        </div>
      ))}
    </Slider>
  );
}

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} slick-arrow-prev`}
      onClick={onClick}
    />
  );
};

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} slick-arrow-next`}
      onClick={onClick}
    />
  );
};

export default ProductList;
