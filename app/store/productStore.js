import { create } from "zustand";

const useProductStore = create((set) => ({
    allProducts: [],
    categories: [],
    currentPage: 1,
    itemsPerPage: 28, // Change this to 28
    selectedCategory: '',
    totalProducts: 0,
    setAllProducts: (products) => set({ allProducts: products }),
    setCategories: (categories) => set({ categories }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    setTotalProducts: (total) => set({ totalProducts: total }),
}));

export default useProductStore;
