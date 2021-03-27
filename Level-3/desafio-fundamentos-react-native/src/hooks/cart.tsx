import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const getProducts: any = await AsyncStorage.getItem(
        '@GoMarketplace:product',
      );

      setProducts(JSON.parse(getProducts));
    }

    loadProducts();
  }, []);

  const addToCart = useCallback(
    async product => {
      if (products) {
        const productExistingCart = products.find(prd => prd.id === product.id);

        if (productExistingCart) {
          const incrementItemCart = products.map(prd => {
            if (productExistingCart.id === prd.id) {
              return { ...prd, quantity: 1 + prd.quantity };
            }

            return prd;
          });

          setProducts(incrementItemCart);

          return;
        }
      }

      const productWithQuantity = [
        {
          ...product,
          quantity: 1,
        },
      ];
      // Verifica se já existe algum produto no carrinho
      const totalProducts = products
        ? [...products, ...productWithQuantity]
        : productWithQuantity;

      setProducts(totalProducts);
      // Salva os dados na memória do celular
      await AsyncStorage.setItem(
        '@GoMarketplace:product',
        JSON.stringify(totalProducts),
      );
    },
    [products],
  );

  const increment = useCallback(
    async id => {
      const incrementItemCart = products.map(cartProduct => {
        if (id === cartProduct.id) {
          return { ...cartProduct, quantity: 1 + cartProduct.quantity };
        }

        return cartProduct;
      });
      setProducts(incrementItemCart);

      await AsyncStorage.setItem(
        '@GoMarketplace:product',
        JSON.stringify(incrementItemCart),
      );
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const decrementItemCart = products.map(cartProduct => {
        if (id === cartProduct.id) {
          return cartProduct.quantity === 1
            ? { ...cartProduct }
            : { ...cartProduct, quantity: cartProduct.quantity - 1 };
        }

        return cartProduct;
      });
      setProducts(decrementItemCart);

      await AsyncStorage.setItem(
        '@GoMarketplace:product',
        JSON.stringify(decrementItemCart),
      );
    },
    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
