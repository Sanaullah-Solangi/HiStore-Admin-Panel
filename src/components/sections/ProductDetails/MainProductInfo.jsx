import { ShoppingCartOutlined, StockOutlined } from "@ant-design/icons";
import { Image, Rate } from "antd";
const ProductMainInfo = ({
  images,
  title,
  brand,
  originalPrice,
  price,
  stock,
  averageRating,
  description,
  product,
  category,
  totalSold,
  likes,
}) => {
  return (
    <div className="flex  flex-col md:flex-row gap-6 lg:gap-12 mb-10 h-[500px]">
      {/* === IMAGES CONTAINER === */}
      <div className="flex-1 max-w-lg">
        {/* Main product image */}
        <div className="mb-3 rounded overflow-hidden h-[80%]">
          <Image
            src={images.main}
            alt={title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Thumbnail images */}
        <div className="flex gap-2">
          {images?.thumbnails?.map((image, index) => (
            <div
              key={index}
              className="w-20 h-20 border flex-1 border-gray-200 rounded overflow-hidden cursor-pointer"
            >
              {console.log(index, image)}
              <Image
                src={image}
                alt={`${title} thumbnail ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      {/* === MAIN CONTENT CONTAINER === */}
      <div className="flex-1">
        {/* BRAND */}
        <div className="text-sm text-gray-600 mb-2">{brand.toUpperCase()}</div>
        {/* TITLE */}
        <h1 className="text-2xl font-semibold mb-4">{title}</h1>
        {/* === PRICE CONTAINER === */}
        <div className="flex items-center">
          {/* ORIGINAL PRICE */}
          <span className="line-through text-gray-500 mr-2">
            ${originalPrice.toFixed(2)}
          </span>
          {/* DISCOUNTED PRICE */}
          <span className="text-2xl font-semibold text-black mr-4">
            ${price.toFixed(2)}
          </span>
          {/* STOCK */}
          <span className="text-sm text-gray-600 mr-4">
            {stock} Stock <StockOutlined />
          </span>
        </div>
        {/* === RATING CONTAINER ===*/}
        <div className="flex items-center gap-2  mb-5">
          <Rate disabled defaultValue={averageRating} allowHalf />
          <span>{averageRating.toFixed(1)}</span>
        </div>
        {/* === MORE CONTENT CONTANER === */}
        <div className="mb-6">
          {/* DESCRIPTION */}
          <h3 className="text-base font-semibold mb-2">Description:</h3>
          <p className="text-sm leading-relaxed text-gray-800 mb-2">
            {description}
          </p>
          {/* PRODUCT STATUS */}
          <p className="text-sm leading-relaxed text-gray-800 mb-2">
            <strong>Status:</strong> {product.status}
          </p>
          {/* CATEGORY */}
          <p className="text-sm leading-relaxed text-gray-800 mb-2">
            <strong>Category:</strong> {category}
          </p>
          {/* TOTAL SOLD */}
          <p className="text-sm leading-relaxed text-gray-800 mb-2">
            <strong>Total Sold:</strong> {totalSold}
          </p>
          {/* LIKES */}
          <p className="text-sm leading-relaxed text-gray-800 mb-2">
            <strong>Likes:</strong> {likes.length}
          </p>
        </div>
        {/* === SIZE CONTAINER === */}
        {/* <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-semibold">Size: {stock}</h3>
            <a href="#" className="text-sm text-blue-600">
              View Size Chart
            </a>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded">
              6
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-black bg-gray-100 rounded">
              8
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded">
              10
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded">
              14
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded">
              18
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded">
              20
            </button>
          </div>
        </div> */}
        {/* === ADD TO CART === */}
        {/* <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button className="flex-1 py-3 px-6 bg-black text-white font-semibold rounded">
            <ShoppingCartOutlined className="mr-2" /> Add To Cart
          </button>
          <button className="flex-1 py-3 px-6 bg-white text-black border border-black font-semibold rounded">
            Checkout Now
          </button>
        </div> */}

        <div className="text-sm text-gray-600">
          <p>Delivery: TBC</p>
        </div>
      </div>
    </div>
  );
};

export default ProductMainInfo;
