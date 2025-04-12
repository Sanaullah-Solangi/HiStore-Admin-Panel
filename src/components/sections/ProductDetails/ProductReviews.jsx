import { Rate, Pagination, Progress, Flex } from "antd";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
const ProductReviews = ({ averageRating, reviews, reviewCounts }) => {
  const { mainColor } = useContext(ThemeContext);
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-6">Product Reviews</h2>

      <div className="flex gap-10 mb-6 p-6 bg-gray-50 rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <Progress
            type="circle"
            percent={averageRating.toFixed(1)}
            format={() => `${averageRating.toFixed(1)}`}
            strokeColor={mainColor}
          />

          <Rate disabled defaultValue={averageRating} allowHalf />
          <p className="text-xs text-gray-600">
            Based on {reviews.length} reviews
          </p>
        </div>

        <div className="flex-1">
          {[3, 4, 3, 2, 5].map((star) => (
            // <div key={star} className="flex items-center gap-2 mb-2">
            //   <span className="text-sm text-gray-600 w-6">{star}.0</span>
            //   <div className="flex-1 h-2 bg-gray-200 rounded overflow-hidden">
            //     <div
            //       className="h-full bg-yellow-400"
            //       style={{
            //         width: `${(reviewCounts[star] / reviews.length) * 100}%`,
            //       }}
            //     ></div>
            //   </div>
            //   <span className="text-sm text-gray-600">
            //     {reviewCounts[star]}
            //   </span>
            // </div>
            <Progress
              percent={(star / 5) * 100}
              format={() => `${star}.0`}
              strokeColor={mainColor}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-60">
          <h3 className="text-base font-semibold mb-4">Reviews Filter</h3>
          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-3">Rating</h4>
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  id={`star-${star}`}
                  className="h-4 w-4"
                />
                <label
                  htmlFor={`star-${star}`}
                  className="text-sm text-gray-800"
                >
                  {star} ★
                </label>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-3">Review Topics</h4>
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" id="product-quality" className="h-4 w-4" />
              <label
                htmlFor="product-quality"
                className="text-sm text-gray-800"
              >
                Product Quality
              </label>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" id="seller-services" className="h-4 w-4" />
              <label
                htmlFor="seller-services"
                className="text-sm text-gray-800"
              >
                Seller Services
              </label>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" id="product-price" className="h-4 w-4" />
              <label htmlFor="product-price" className="text-sm text-gray-800">
                Product Price
              </label>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" id="shipment" className="h-4 w-4" />
              <label htmlFor="shipment" className="text-sm text-gray-800">
                Shipment
              </label>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="match-description"
                className="h-4 w-4"
              />
              <label
                htmlFor="match-description"
                className="text-sm text-gray-800"
              >
                Match with Description
              </label>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex border-b border-gray-200 mb-6">
            <div className="px-4 py-3 text-sm border-b-2 border-black font-semibold">
              All Reviews
            </div>
            <div className="px-4 py-3 text-sm cursor-pointer">
              With Photo & Video
            </div>
            <div className="px-4 py-3 text-sm cursor-pointer">
              With Description
            </div>
          </div>

          <div>
            {reviews.map((review) => (
              <div key={review.id} className="py-6 border-b border-gray-200">
                <div className="mb-3">
                  <Rate disabled defaultValue={review.rating} allowHalf />
                </div>
                <div className="mb-4">
                  <p className="text-sm leading-relaxed text-gray-800 mb-2">
                    This is amazing product! I love it.
                  </p>
                  <p className="text-xs text-gray-500">
                    July 23, 2023 03:45 PM
                  </p>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt={review.user}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-sm font-semibold">{review.user}</div>
                </div>
                <div className="flex gap-4">
                  <button className="flex items-center gap-1 text-sm text-gray-600">
                    <span>👍</span> 123
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-600">
                    <span>👎</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductReviews;
