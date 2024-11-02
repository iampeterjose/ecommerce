import { create } from "zustand";

const useProductStore = create((set, get) => ({
    isOpen: false,
    allProducts: [],
    categories: [],
    currentPage: 1,
    itemsPerPage: 30,
    selectedCategory: '',
    totalProducts: 0,
    product: null,
    imageClicked: '',
    relatedProducts: [],
    newArrivals: [],
    bestSellers: [],
    exclusiveOffers: [],
    essentials: [],
    error: '',
    loading: true,
    searchTerm: '',
    count: 0,
    cart: [],
    totalQuantity: 0,
    address: {},

    // State setter functions
    setAddress: (newAddress) => set((state) => ({
        address: { ...state.address, ...newAddress }
    })),

    setCart: (itemToAdd) => {
        set(state => {
            const existingItem = state.cart.find(item => item.id === itemToAdd.id);
            let updatedCart;

            if (existingItem) {
                updatedCart = state.cart.map(item =>
                    item.id === itemToAdd.id ? { ...item, quantity: item.quantity + itemToAdd.quantity } : item
                );
            } else {
                updatedCart = [...state.cart, itemToAdd];
            }

            // Update total quantity
            const newTotalQuantity = updatedCart.reduce((total, item) => total + (item.quantity || 0), 0);
            return { cart: updatedCart, totalQuantity: newTotalQuantity };
        });
    },

    clearCart: () => {
        set(() => {
            localStorage.setItem('cart', JSON.stringify([])); // Clear local storage
            return { cart: [], totalQuantity: 0 }; // Clear cart state
        });
    },

    updateQuantity: (id, quantity) => {
        set(state => {
            const updatedCart = state.cart
                .map(item => (item.id === id ? { ...item, quantity } : item))
                .filter(item => item.quantity > 0); // Remove items with zero quantity
            localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage

            // Update total quantity
            const newTotalQuantity = updatedCart.reduce((total, item) => total + item.quantity, 0);
            return { cart: updatedCart, totalQuantity: newTotalQuantity };
        });
    },

    removeFromCart: (id) => {
        set(state => {
            const updatedCart = state.cart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
            return { cart: updatedCart, totalQuantity: updatedCart.reduce((total, item) => total + (item.quantity || 0), 0) };
        });
    },

    // Other state management functions
    setCount: (updater) => set(state => ({
        count: typeof updater === 'function' ? updater(state.count) : updater
    })),
    
    setSearchTerm: (term) => set({ searchTerm: term }),
    setIsOpen: () => set(state => ({ isOpen: !state.isOpen })),
    setAllProducts: (products) => set({ allProducts: products }),
    setCategories: (categories) => set({ categories }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    setTotalProducts: (total) => set({ totalProducts: total }),
    setProduct: (selectedProduct) => set({ product: selectedProduct }),
    setImageClicked: (image) => set({ imageClicked: image }),
    setRelatedProducts: (selectedRelatedProducts) => set({ relatedProducts: selectedRelatedProducts }),
    setNewArrivals: (newArrival) => set({ newArrivals: newArrival }),
    setBestSellers: (bestSeller) => set({ bestSellers: bestSeller }),
    setExclusiveOffers: (exclusive) => set({ exclusiveOffers: exclusive }),
    setEssentials: (ess) => set({ essentials: ess }),
    setError: (isError) => set({ error: isError }),
    setLoading: (isLoading) => set({ loading: isLoading }),
}));

// Hydrate cart from localStorage after store creation
if (typeof window !== 'undefined') {
    const savedCartString = localStorage.getItem('cart');
    let savedCart = [];
    try {
        savedCart = savedCartString ? JSON.parse(savedCartString) : [];
    } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
    }

    // Set the cart and totalQuantity in the store
    useProductStore.setState({
        cart: savedCart,
        totalQuantity: savedCart.reduce((total, item) => total + (item.quantity || 0), 0),
    });
}

export default useProductStore;
