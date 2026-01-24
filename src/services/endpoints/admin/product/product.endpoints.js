// const productEndpoints = {
//     createProduct: `/admin/product/create`,
//     updateProduct: (productId) => `admin/product/update/${productId}`,
// };

// export default productEndpoints;



const productEndpoints = {
    createProduct: `/admin/product/create`,
    updateProduct: (productId) => `admin/product/update/${productId}`,
    deleteProduct: (productId) => `admin/product/delete/${productId}`,
};

export default productEndpoints;