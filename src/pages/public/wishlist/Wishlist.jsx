import { useDispatch, useSelector } from "react-redux";
import WishlistItemRow from "./components/WishlistItemRow";
import EmptyWishlist from "./components/EmptyWishlist";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../../../utils/apiConnector";
import {
    addToWishList,
    removeFromWishList,
    setWishList,
} from "../../../redux/slices/wishListSlice";

function Wishlist() {
    // Placeholder data from Redux (empty array for now)
    const wishlistItems = useSelector((state) => state?.wishlist || []);
    const user = useSelector((state) => state?.user?.user);
    const dispatch = useDispatch();
    if (!user) return <Navigate to={"/login"} replace />;

    return (
        <div className="boxedContainer h-auto w-full py-4 sm:py-6 md:py-8 px-3 sm:px-6 md:px-8 max-w-7xl mx-auto ">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[35px] font-bold uppercase mb-4 sm:mb-6">
                Wishlist
            </h1>

            {wishlistItems.length === 0 ? (
                <EmptyWishlist />
            ) : (
                <div className="space-y-4  md:w-[80%] mx-auto">
                    {wishlistItems.map((item, idx) => (
                        <WishlistItemRow key={item._id} item={item} idx={idx} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Wishlist;
