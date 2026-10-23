import {
    FiBox,
    FiEdit,
    FiTrash,
    FiArrowUp,
    FiArrowDown,
    FiSearch,
} from "react-icons/fi";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import productApis from "../../../services/api/admin/product/product.api";
import { setProducts } from "../../../redux/slices/productSlice";

//  Skeleton Component
const ProductCardSkeleton = () => (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 animate-pulse space-y-2">
        <div className="w-20 h-20 bg-gray-300 rounded-md mx-auto" />
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="flex justify-between mt-3">
            <div className="h-6 w-14 bg-gray-300 rounded"></div>
            <div className="h-6 w-14 bg-gray-300 rounded"></div>
        </div>
    </div>
);

const ProductList = () => {
    const products = useSelector((state) => state.product.products) || [];
    const [deleteProductId, setDeleteProductId] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const dispatch = useDispatch();
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    //For Image Model States 
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState("");

    const [loading, setLoading] = useState(true);

    // simulate loading time
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [products]);

    const toggleSort = (field) => {
        if (sortField === field) {
            setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const displayedProducts = useMemo(() => {
        let list = [...products];

        if (searchTerm.trim()) {
            const term = searchTerm.trim().toLowerCase();
            list = list.filter((p) => p.name.toLowerCase().includes(term));
        }

        const min = parseFloat(minPrice) || 0;
        const max = parseFloat(maxPrice) || Infinity;
        list = list.filter((p) => p.price >= min && p.price <= max);

        if (sortField) {
            list.sort((a, b) => {
                let aVal = a[sortField],
                    bVal = b[sortField];
                if (sortField === "category") {
                    aVal = a.category.name;
                    bVal = b.category.name;
                }
                if (aVal == null || bVal == null) return 0;
                if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
                return aVal < bVal ? 1 : -1;
            });
        }

        return list;
    }, [products, searchTerm, minPrice, maxPrice, sortField, sortOrder]);

    const productDeleteHandler = async (productId) => {
        const toastId = toast.loading("Please wait");
        try {
            const res = await productApis.deleteProduct(productId);
            setProducts();
            // console.log("Product Response After Delete ->", res);
            dispatch(setProducts(res));
            setDeleteProductId(null);
        } catch (error) {
            handleAxiosError(error);
        } finally {
            toast.dismiss(toastId);
        }
    };

    // const formattedPrice = new Intl.NumberFormat("en-IN", {
    //     style: "currency",
    //     currency: "INR",
    //     maximumFractionDigits: 0,
    // }).format(Number(product?.price || 0));

    const formatINR = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(Number(amount || 0));


    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="flex items-center gap-2 text-xl font-semibold uppercase text-gray-800 tracking-wide">
                    <FiBox size={20} /> Products
                    <span className="text-sm font-normal text-gray-600">
                        ({displayedProducts.length} / {products.length})
                    </span>
                </h2>
                <Link
                    to="/admin/products/add"
                    className="bg-gray-800 text-white px-4 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md w-full sm:w-auto"
                >
                    Add Product
                </Link>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-wrap gap-2 items-center">
                <div className="flex items-center border border-gray-300 rounded-md px-2">
                    <FiSearch className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ml-1 py-1 text-sm outline-none"
                    />
                </div>
                <input
                    type="number"
                    placeholder="Min price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-24 px-2 py-1 border border-gray-300 rounded-md text-sm"
                />
                <input
                    type="number"
                    placeholder="Max price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-24 px-2 py-1 border border-gray-300 rounded-md text-sm"
                />
            </div>

            {/* Sorting Controls */}
            <div className="flex flex-wrap gap-2">
                {["price", "stock", "rating"].map((field) => (
                    <button
                        key={field}
                        onClick={() => toggleSort(field)}
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                        Sort by {field.charAt(0).toUpperCase() + field.slice(1)}
                        {sortField === field &&
                            (sortOrder === "asc" ? (
                                <FiArrowUp size={16} />
                            ) : (
                                <FiArrowDown size={16} />
                            ))}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <ProductCardSkeleton key={idx} />
                    ))}
                </div>
            ) : displayedProducts.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 text-sm">
                        No products match your criteria.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayedProducts.map((product) => (
                        <motion.div
                            key={product._id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex flex-col gap-2 capitalize"
                        >
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-70 h-40 object-cover mx-auto rounded-md"
                            />

                            <h3 className="capitalize text-base font-medium text-gray-800 ">
                                {product.name}
                            </h3>

                            <p className="text-sm text-gray-600 line-clamp-2">
                                {product.description}
                            </p>

                            <p className="text-sm text-gray-600">
                                Category: {product?.category?.name}
                            </p>

                            <p className="text-sm text-gray-600">
                                {/* Price: <span className="text-green-700 font-semibold">₹{product?.price}</span> */}
                                Price: <span className="text-green-700 font-semibold">{formatINR(product?.price)}</span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Stock: {product?.stock}
                            </p>
                            <div className="flex justify-between mt-2">
                                <Link
                                    to={`/admin/products/edit/${product._id}`}
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                                >
                                    <FiEdit size={14} /> Edit
                                </Link>
                                <button
                                    onClick={() => setDeleteProductId(product._id)}
                                    className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
                                >
                                    <FiTrash size={14} /> Delete
                                </button>

                                {/* <Link
                                    to={`/admin/products/views_details/${product._id}`}
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                                >
                                    <FiEdit size={14} /> View Details
                                </Link> */}

                                {/* <button
                                    onClick={() => {
                                        setSelectedProduct(product);
                                        setDetailsOpen(true);
                                        setCurrentIndex(0);
                                    }}
                                    className="text-sm text-purple-600 hover:text-purple-800 underline"
                                >
                                    View Details
                                </button> */}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation */}
            {deleteProductId && (
                <div className="fixed inset-0 glass bg-opacity-30 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Confirm Deletion
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete this product? This action cannot
                            be undone.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => productDeleteHandler(deleteProductId)}
                                className="bg-red-600 text-white px-4 py-2 text-sm uppercase hover:bg-red-700 transition-colors duration-200 shadow-md w-full sm:w-auto"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setDeleteProductId(null)}
                                className="bg-gray-200 text-gray-800 px-4 py-2 text-sm uppercase hover:bg-gray-300 transition-colors duration-200 shadow-md w-full sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}


            {detailsOpen && selectedProduct && (
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
                            {/* {selectedProduct.images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`w-16 h-16 rounded object-cover cursor-pointer border ${i === currentIndex ? "border-purple-600" : "border-transparent"}`}
                                />
                            ))} */}
                        </div>

                        {/* Product Details */}
                        <div className="mt-4 space-y-2">
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">Category:</span> {selectedProduct.category?.name}
                            </p>

                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">Price:</span> ₹{selectedProduct.price}
                            </p>

                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">Stock:</span> {selectedProduct.stock}
                            </p>

                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">Description:</span><br />
                                {selectedProduct.description}
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}

        </motion.div>
    );
};

export default ProductList;
