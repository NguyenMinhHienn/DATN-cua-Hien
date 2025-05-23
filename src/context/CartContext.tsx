import React, { createContext, useContext, useState } from "react";
import { IProduct } from "../inface/product";

interface CartItem extends IProduct {
    quantity: number;
}

interface CartContextProps {
    cart: CartItem[];
    addToCart: (product: IProduct) => void;
    updateQuantity: (id: number, quantity: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void; // Thêm clearCart vào interface
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: IProduct) => {
        const token = localStorage.getItem("key"); // Kiểm tra token đăng nhập
        if (!token) {
            alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
            window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
            return;
        }

        // Logic thêm sản phẩm vào giỏ hàng
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCart([]); // Xóa toàn bộ giỏ hàng
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }} // Thêm clearCart vào value
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};