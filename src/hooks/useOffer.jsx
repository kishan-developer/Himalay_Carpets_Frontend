// // src/hooks/useOffer.js
// import { useState, useEffect } from "react";
// import axiosInstance from "../utils/apiConnector";

// /**
//  * Module‑scoped cache.
//  * null = not yet fetched;
//  * false = fetched & no active offer;
//  * number = fetched & that percent discount
//  */
// let cachedDiscount = null;
// /** Shared promise so concurrent hook calls only fire one network request */
// let fetchPromise = null;

// /**
//  * useOffer
//  * — returns either a Number (discount%) or false
//  * — only fetches /admin/offer once until a full page reload
//  */
// export function useOffer() {
//     // initialize to cachedDiscount if already fetched, else false
//     const [discount, setDiscount] = useState(
//         cachedDiscount === null ? false : cachedDiscount
//     );

//     useEffect(() => {
//         // if we've already fetched, do nothing
//         if (cachedDiscount !== null) return;

//         // start request if not already in flight
//         if (!fetchPromise) {
//             fetchPromise = axiosInstance
//                 .get("/offer/")
//                 .then((res) => {
//                     // assume success returns a number, else treat as no offer
//                     const d =
//                         typeof res.data.discount === "number"
//                             ? res.data
//                             : false;

//                     cachedDiscount = d.discount;
//                     return d.discount;
//                 })
//                 .catch(() => {
//                     // on any error, treat as no offer
//                     cachedDiscount = false;
//                     return false;
//                 });
//         }

//         // when the promise resolves, update local state
//         fetchPromise.then((d) => {
//             console.log(d);
//             setDiscount(d);
//         });
//     }, []);

//     return discount;
// }






/// 2 Aug 

import { useState, useEffect } from "react";
import axiosInstance from "../utils/apiConnector";

// Cache for all offers
let cachedOffers = null;
let fetchPromise = null;

// Cache for individual offers by ID
const offerByIdCache = new Map();
const offerByIdPromises = new Map();

const isOfferActive = (offer) => {
    const createdAt = new Date(offer.createdAt).getTime();
    const expiry = createdAt + offer.maxAge * 60 * 60 * 1000;
    return offer.status && Date.now() < expiry;
};

/**
 * useOffer
 * — If id is provided: returns discount (number) or false
 * — If id is not provided: returns array of active offers
 */
export function useOffer(id = null) {
    const [result, setResult] = useState(id ? null : cachedOffers ?? []);

    useEffect(() => {
        if (id) {
            // Handle specific offer by ID
            if (offerByIdCache.has(id)) {
                setResult(offerByIdCache.get(id));
                return;
            }

            if (!offerByIdPromises.has(id)) {
                const promise = axiosInstance
                    .get(`/offer/${id}`)
                    .then((res) => {
                        const offer = res.data;
                        const discount =
                            offer && isOfferActive(offer)
                                ? offer.discount
                                : false;
                        offerByIdCache.set(id, discount);
                        return discount;
                    })
                    .catch(() => {
                        offerByIdCache.set(id, false);
                        return false;
                    });

                offerByIdPromises.set(id, promise);
            }

            offerByIdPromises.get(id).then(setResult);
        } else {
            // Handle all active offers
            if (cachedOffers !== null) return;

            if (!fetchPromise) {
                fetchPromise = axiosInstance
                    .get("/offer/")
                    .then((res) => {
                        const offers = Array.isArray(res.data) ? res.data : [];
                        const active = offers.filter(isOfferActive);
                        cachedOffers = active;
                        return active;
                    })
                    .catch(() => {
                        cachedOffers = [];
                        return [];
                    });
            }

            fetchPromise.then(setResult);
        }
    }, [id]);

    return result;
}
