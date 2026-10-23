import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import SidebarFilter from "../../../components/common/SidebarFilter";
import { Star, Filter, Grid, List, ChevronDown } from "lucide-react";
import ProductCard from "./ProductCard";
// Memoized ProductImage component for lazy loading

function CategoryPage() {
    const { id, category, fabric } = useParams();
    const displayCategory =
        (category || fabric)?.replace(/-/g, " ") || "Category";

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categoryDetails, setCategoryDetails] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState("default");
    const [viewMode, setViewMode] = useState("grid");

    const navigate = useNavigate();

    const ProductSkeleton = useMemo(
        () => () =>
        (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm h-full flex flex-col">
                <div className="relative h-64 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
                <div className="p-4 space-y-3 flex-1 flex flex-col">
                    <div className="h-5 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                    <div className="flex justify-between items-center mt-auto">
                        <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>
            </div>
        ),
        []
    );

    useEffect(() => {
        const controller = new AbortController();
        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const url = fabric
                    ? `${import.meta.env.VITE_BACKEND_URL}products/${fabric}/${id}`
                    : `${import.meta.env.VITE_BACKEND_URL}categories/${id}`;
                const res = await fetch(url, { signal: controller.signal });
                if (!res.ok) throw new Error("Failed to fetch data");
                const json = await res.json();
                const list = fabric ? json.data : json.data.products;

                // Sort the products immediately after fetching
                const sortedList = sortProducts(list, sortOption);

                setProducts(list);
                setFilteredProducts(sortedList);
                setCategoryDetails({
                    name: fabric || json.data.name || displayCategory,
                    description:
                        json.data.description ||
                        "Explore our curated collection of premium products.",
                });
            } catch (err) {
                if (err.name !== "AbortError") setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
        return () => controller.abort();
    }, [id, fabric, displayCategory, sortOption]);

    const sortProducts = useCallback((list, opt) => {
        const arr = [...list];
        if (opt === "price-low-to-high") arr.sort((a, b) => a.price - b.price);
        else if (opt === "price-high-to-low")
            arr.sort((a, b) => b.price - a.price);
        else if (opt === "rating")
            arr.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        else if (opt === "newest")
            arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return arr;
    }, []);

    const handleFilterChange = useCallback(
        (filters) => {
            const { priceRange, fabric, color, technique, size, style, texture } = filters;

            const filtered = products.filter((p) => {
                return (
                    p.price >= priceRange[0] &&
                    p.price <= priceRange[1] &&
                    (fabric
                        ? p.fabric.title.toLowerCase() === fabric.toLowerCase()
                        : true) &&
                    (color ? p.color === color : true) &&
                    (technique ? p.technique === technique : true) &&
                    (size ? p.size === size : true) &&
                    (style ? p.style === style : true) &&
                    (texture ? p.texture === texture : true)
                );
            });
            // Re-sort after filtering
            const sortedAndFiltered = sortProducts(filtered, sortOption);
            setFilteredProducts(sortedAndFiltered);
        },
        [products, sortProducts, sortOption]
    );

    const handleSortChange = useCallback(
        (e) => {
            const newSortOption = e.target.value;
            setSortOption(newSortOption);
            const sorted = sortProducts(filteredProducts, newSortOption);
            setFilteredProducts(sorted);
        },
        [filteredProducts, sortProducts]
    );

    const renderStars = useCallback(
        (rating) =>
            Array.from({ length: 5 }, (_, i) => (
                <Star
                    key={i}
                    className={`w-3 h-3 ${i < Math.floor(rating || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                        }`}
                />
            )),
        []
    );

    return (
        <main>
            <div className="boxedContainer pb-4">
                <div className="py-8 border-b border-gray-200 bg-white mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center space-y-4">
                            <h1 className="text-3xl md:text-4xl font-medium text-foreground capitalize tracking-tight">
                                {categoryDetails?.name?.replace(/-/g, " ") ||
                                    displayCategory.replace(/-/g, " ")}
                            </h1>
                            <p className="text-lg text-foreground max-w-2xl mx-auto leading-relaxed px-4  text-center sm:text-center ">
                                {categoryDetails?.description}
                            </p>
                            <div className="flex items-center justify-center gap-2 text-sm text-foreground">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <span>
                                    {filteredProducts.length} Products Available
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden flex items-center gap-2 bg-foreground text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
                        >
                            <Filter className="w-4 h-4" /> Filters
                        </button>
                        <div className="hidden sm:flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-md transition-colors ${viewMode === "grid"
                                    ? "bg-white shadow-sm text-foreground"
                                    : "text-foreground hover:text-foreground"
                                    }`}
                            >
                                <Grid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded-md transition-colors ${viewMode === "list"
                                    ? "bg-white shadow-sm text-foreground"
                                    : "text-foreground hover:text-foreground"
                                    }`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="text-sm font-medium text-foreground">
                            Sort by:
                        </label>
                        <div className="relative">
                            <select
                                value={sortOption}
                                onChange={handleSortChange}
                                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-foreground text-sm font-medium cursor-pointer transition-all duration-200"
                            >
                                <option value="default">Featured</option>
                                <option value="newest">Newest First</option>
                                <option value="price-low-to-high">
                                    Price: Low to High
                                </option>
                                <option value="price-high-to-low">
                                    Price: High to Low
                                </option>
                                <option value="rating">Highest Rated</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="flex gap-8">
                    <SidebarFilter
                        onFilterChange={handleFilterChange}
                        isOpen={isSidebarOpen}
                        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    />


                    <div className="flex-1">
                        {loading ? (
                            <div
                                className={`grid gap-6 ${viewMode === "grid"
                                    ? "grid-cols-1 sm:grid-cols-3 lg:grid-cols-3"
                                    : "grid-cols-1"
                                    }`}
                            >
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <ProductSkeleton key={i} />
                                ))}
                            </div>
                        ) : error ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-red-600 text-2xl">
                                        ⚠
                                    </span>
                                </div>
                                <h3 className="text-lg font-medium text-foreground mb-2">
                                    Something went wrong
                                </h3>
                                <p className="text-red-600">{error}</p>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-foreground text-2xl">
                                        📦
                                    </span>
                                </div>
                                <h3 className="text-lg font-medium text-foreground mb-2">
                                    No products found
                                </h3>
                                <p className="text-foreground">
                                    Try adjusting your filters or search
                                    criteria
                                </p>
                            </div>
                        ) : (
                            <ProductGrid
                                products={filteredProducts}
                                viewMode={viewMode}
                                navigate={navigate}
                            />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default CategoryPage;



const ProductGrid = React.memo(({ products, viewMode, navigate }) => {


    if (!products || products.length === 0) return null;

    return (
        <div className={`grid px-4  gap-6  ${viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-3 auto-rows-fr px-4"
            : "grid-cols-1"}`}>

            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                    viewMode={viewMode}
                    navigate={navigate}
                />
            ))}
        </div>
    );
});