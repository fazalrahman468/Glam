// import React, {createContext, useContext, useState, useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({children}) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [user, setUser] = useState({fullName: '', email: '', mobileNumber: ''});

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const storedUser = await AsyncStorage.getItem('user');
//         if (storedUser) {
//           setUser(JSON.parse(storedUser));
//           console.log('User loaded from AsyncStorage:', storedUser);
//         }
//       } catch (error) {
//         console.error('Failed to load user from AsyncStorage:', error);
//       }
//     };

//     loadUser();
//   }, []);

//   useEffect(() => {
//     const saveUser = async () => {
//       try {
//         await AsyncStorage.setItem('user', JSON.stringify(user));
//         console.log('User saved to AsyncStorage:', user);
//       } catch (error) {
//         console.error('Failed to save user to AsyncStorage:', error);
//       }
//     };

//     saveUser();
//   }, [user]);

//   return (
//     <CartContext.Provider value={{cartItems, setCartItems, user, setUser}}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export {CartContext};

import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    profilePicture: '',
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          // console.log('User loaded from AsyncStorage:', storedUser);
        }
      } catch (error) {
        console.error('Failed to load user from AsyncStorage:', error);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    const saveUser = async () => {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        // console.log('User saved to AsyncStorage:', user);
      } catch (error) {
        console.error('Failed to save user to AsyncStorage:', error);
      }
    };

    saveUser();
  }, [user]);

  return (
    <CartContext.Provider value={{cartItems, setCartItems, user, setUser}}>
      {children}
    </CartContext.Provider>
  );
};

export {CartContext};
