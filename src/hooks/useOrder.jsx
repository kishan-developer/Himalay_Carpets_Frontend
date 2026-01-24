// hooks/useOrders.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/apiConnector";
import { setOrders, setIsLoaded } from "../redux/slices/orderSlice";

export const useOrders = (userId) => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders);
    const isLoaded = useSelector((state) => state.order.isLoaded);

    useEffect(() => {
        if (!userId || isLoaded) return;

        axiosInstance
            .get(`/user/orders/${userId}`)
            .then((res) => {
                dispatch(setOrders(res.data));
                dispatch(setIsLoaded(true));
            })
            .catch((err) => console.error("Failed to fetch orders", err));
    }, [userId, isLoaded, dispatch]);

    return orders;
};
