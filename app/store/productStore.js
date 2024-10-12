import { create } from "zustand";

const useProductStore = create((set, get) => {
    let savedCart = [];

    if (typeof window !== 'undefined') {
        const savedCartString = localStorage.getItem('cart');
        try {
            savedCart = savedCartString ? JSON.parse(savedCartString) : [];
        } catch (error) {
            console.error("Failed to parse cart from localStorage:", error);
            savedCart = [];
        }
    }

    return {
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
        cart: savedCart, // Initialize cart with savedCart
        totalQuantity: savedCart.reduce((total, item) => total + (item.quantity || 0), 0),
        address: {},
        setAddress: (newAddress) => set((state) => ({
            address: { ...state.address, ...newAddress }
        })),
        
        setCart: (itemToAdd) => {
            set(state => {
                const existingItem = state.cart.find(item => item.id === itemToAdd.id);
                let updatedCart;
        
                if (existingItem) {
                    // If the item already exists, increase its quantity
                    updatedCart = state.cart.map(item =>
                        item.id === itemToAdd.id ? { ...item, quantity: item.quantity + itemToAdd.quantity } : item
                    );
                } else {
                    // If the item does not exist, add it to the cart
                    updatedCart = [...state.cart, itemToAdd];
                }
        
                // Update local storage
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                
                // Calculate new total quantity
                const newTotalQuantity = updatedCart.reduce((total, item) => total + (item.quantity || 0), 0);
        
                return { cart: updatedCart, totalQuantity: newTotalQuantity };
            });
        },

        clearCart: () => {
            console.log(`Cart cleared`);
            set(() => {
                localStorage.setItem('cart', JSON.stringify([])); // Clear local storage
                return { cart: [], totalQuantity: 0 }; // Clear cart state
            });
        },

        // New method to update the quantity of a specific item
        updateQuantity: (id, quantity) => {
            set(state => {
                const updatedCart = state.cart
                    .map(item =>
                        item.id === id ? { ...item, quantity } : item
                    )
                    .filter(item => item.quantity > 0); // Remove items with zero quantity
                localStorage.setItem('cart', JSON.stringify(updatedCart));

                // Update total quantity
                const newTotalQuantity = updatedCart.reduce((total, item) => total + item.quantity, 0);
                return { cart: updatedCart, totalQuantity: newTotalQuantity };
            });
        },

        removeFromCart: (id) => {
            set(state => {
                const updatedCart = state.cart.filter(item => item.id !== id);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                return { cart: updatedCart, totalQuantity: updatedCart.reduce((total, item) => total + (item.quantity || 0), 0) };
            });
        },

        setCount: (updater) => set(state => ({
            count: typeof updater === 'function' ? updater(state.count) : updater
        })),
        
        // Other state management functions remain unchanged
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
    };
});

export default useProductStore;
