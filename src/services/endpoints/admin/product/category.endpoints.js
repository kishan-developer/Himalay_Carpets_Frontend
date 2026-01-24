const categoryEndpoints = {
    createCategory: `/admin/category/create`,
    updateCategory: (categoryId) => `admin/category/update/${categoryId}`,
    deleteCategory: (categoryId) => `/admin/category/delete/${categoryId}`,
};



export default categoryEndpoints;
