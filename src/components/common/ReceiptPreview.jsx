// // ReceiptPreview.jsx
// import React from "react";
// import { FiImage } from "react-icons/fi";

// /**
//  * ReceiptPreview
//  *
//  * Props:
//  *  - imageUrl: string | null
//  *
//  * Renders:
//  *  - Section heading "Delhivery Receipt"
//  *  - Dashed-border placeholder if no imageUrl
//  *  - Responsive image preview if imageUrl provided
//  */
// const ReceiptPreview = ({ imageUrl }) => {
//     return (
//         <section className="my-8">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                 Delhivery Receipt
//             </h3>

//             {!imageUrl ? (
//                 <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-500">
//                     <FiImage size={48} className="mb-4" />
//                     <p className="text-sm">
//                         No Delhivery receipt uploaded yet.
//                     </p>
//                 </div>
//             ) : (
//                 <div className="overflow-hidden rounded-lg border border-gray-200">
//                     <img
//                         src={imageUrl}
//                         alt="Delhivery Receipt"
//                         className="w-full h-auto object-contain"
//                     />
//                 </div>
//             )}
//         </section>
//     );
// };

// export default ReceiptPreview;






//   6 Aug 

import { FiImage } from "react-icons/fi";

const ReceiptPreview = ({
    imageUrl,
    trackingId,
    parcelWeight,
    deliveryPartner,
}) => {
    return (
        <section className="my-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Delhivery Receipt
            </h3>

            {/* Tracking Info */}
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
                <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium text-gray-900">
                        Tracking ID:
                    </span>{" "}
                    {trackingId || "N/A"}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium text-gray-900">
                        Parcel Weight:
                    </span>{" "}
                    {parcelWeight || "N/A"}
                </p>
                <p className="text-sm text-gray-700">
                    <span className="font-medium text-gray-900">
                        Delivery Partner:
                    </span>{" "}
                    {deliveryPartner || "N/A"}
                </p>
            </div>

            {/* Image or Fallback */}
            {!imageUrl ? (
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-500">
                    <FiImage size={48} className="mb-4" />
                    <p className="text-sm">
                        No Delhivery receipt uploaded yet.
                    </p>
                </div>
            ) : (
                <div className="w-full max-w-full border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                    <div className="w-full relative pb-[70%] bg-gray-100">
                        <img
                            src={imageUrl}
                            alt="Delhivery Receipt"
                            className="absolute top-0 left-0 w-full h-full object-contain"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default ReceiptPreview;
