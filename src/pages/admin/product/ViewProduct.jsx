import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

const ViewProduct = ({
    detailsOpen,
    setDetailsOpen,
    selectedProduct,
    currentIndex,
    setCurrentIndex,
}) => {
    if (!detailsOpen || !selectedProduct) return null;

    const { id } = useParams(); // product id from route
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const dispatch = useDispatch();


     // global store slices
    const categories = useSelector((state) => state.category.categories || []);
    const fabrics = useSelector((s) => s.fabrics || []);
    const { products } = useSelector((s) => s.product);
    const product = products?.find((p) => p._id === id);

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg p-5 w-full max-w-xl relative"
            >
                {/* Close Button */}
                <button
                    onClick={() => setDetailsOpen(false)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
                >
                    ✖
                </button>

                {/* Title */}
                <h2 className="text-xl font-semibold mb-3 text-gray-800">
                    {selectedProduct.name}
                </h2>

                {/* Image Slider */}
                <img
                    src={selectedProduct.images[currentIndex]}
                    alt={selectedProduct.name}
                    className="w-full h-64 object-contain rounded-md bg-gray-50"
                />

                <div className="flex justify-between mt-3">
                    <button
                        disabled={currentIndex === 0}
                        onClick={() => setCurrentIndex((i) => i - 1)}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
                    >
                        Prev
                    </button>

                    <button
                        disabled={currentIndex === selectedProduct.images.length - 1}
                        onClick={() => setCurrentIndex((i) => i + 1)}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 mt-3 overflow-x-auto">
                    {selectedProduct.images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            onClick={() => setCurrentIndex(i)}
                            className={`w-16 h-16 rounded object-cover cursor-pointer border 
                        ${i === currentIndex ? "border-purple-600" : "border-transparent"}`}
                        />
                    ))}
                </div>

                {/* Product Details */}
                <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Category:</span>{" "}
                        {selectedProduct.category?.name}
                    </p>

                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Price:</span> ₹{selectedProduct.price}
                    </p>

                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Stock:</span> {selectedProduct.stock}
                    </p>

                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Description:</span>
                        <br />
                        {selectedProduct.description}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default ViewProduct;
