import {
  createContext,
  useEffect,
  useState
} from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const [loading, setLoading] = useState(true);

  // CHECK TOKEN ON LOAD

  useEffect(() => {

    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }

    setLoading(false);

  }, []);

  // LOGIN

  const login = (newToken) => {

    localStorage.setItem("token", newToken);

    setToken(newToken);
  };

  // LOGOUT

  const logout = () => {

    localStorage.removeItem("token");

    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;