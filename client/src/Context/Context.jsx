import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const Context = createContext(null);

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [isAuthenticated, setAuthenticated] = useState(null);

  const [cartQuantity, setCartQuantity] = useState({ quantity: "" });

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("New_Token"));
  const Authentication = token;

  const getAdmin = async () => {
    const response = await axios.get(`http://localhost:3000/user/getAdmin`, {
      headers: {
        Authorization: Authentication,
      },
    });
    setAdmin(response.data);
  };

  const getToken = async (Token) => {
    try {
      if (!Token) {
        console.log("token not found");
        return;
      }
      setToken("Bearer" + Token);

      localStorage.setItem("New_Token", "Bearer" + Token);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    const response = await axios.get("http://localhost:3000/user/getUser", {
      headers: {
        Authorization: Authentication,
      },
    });
    setAuthenticated(true);

    setUser(response.data.user);
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/product/getAlltProducts",
        {
          headers: {
            Authorization: Authentication,
          },
        }
      );

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getProducts();
    getAdmin();
  }, []);

  return (
    <Context.Provider
      value={{
        products,
        getToken,
        admin,
        Authentication,
        cartItem,
        setCartItem,
        user,
        cartQuantity,
        isAuthenticated,
        setCartQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
