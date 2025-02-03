import React, { createContext, useReducer } from 'react';

const CartContext = createContext();

// Update the cartReducer to handle quantities
const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_ITEM':
        const existingItem = state.items.find(
          (item) => item.id === action.payload.id && item.shopId === action.payload.shopId
        );
        
        if (existingItem) {
          return {
            ...state,
            items: state.items.map((item) =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            total: state.total + action.payload.price,
          };
        }
        
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          total: state.total + action.payload.price,
        };
  
      case 'REMOVE_ITEM':
        const itemToRemove = state.items.find(
          (item) => item.id === action.payload
        );
        
        if (!itemToRemove) return state;
  
        if (itemToRemove.quantity > 1) {
          return {
            ...state,
            items: state.items.map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
            total: state.total - itemToRemove.price,
          };
        }
        
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
          total: state.total - itemToRemove.price,
        };
  
      case 'CLEAR_CART':
        return { items: [], total: 0 };
        
      default:
        return state;
    }
  };

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <CartContext.Provider value={{
        items: state.items,
        total: state.total,
        dispatch
      }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };