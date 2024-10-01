import { create } from "zustand";

const useProductStore = create((set) => ({
    isOpen: true,
    allProducts: [],
    categories: [],
    currentPage: 1,
    itemsPerPage: 28, // Change this to 28
    selectedCategory: '',
    totalProducts: 0,
    product: null,
    imageClicked: '',
    relatedProducts: [],
    newArrivals: [],
    setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
    setAllProducts: (products) => set({ allProducts: products }),
    setCategories: (categories) => set({ categories }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    setTotalProducts: (total) => set({ totalProducts: total }),
    setProduct: (selectedProduct) => set({product: selectedProduct}),
    setImageClicked: (image) => set({imageClicked: image}),
    setRelatedProducts: (selectedRelatedProducts) => set({relatedProducts: selectedRelatedProducts}),
    setNewArrivals: (newArrival) => set({newArrivals: newArrival}),
}));

export default useProductStore;
