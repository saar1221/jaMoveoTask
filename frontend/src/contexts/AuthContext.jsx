import { createContext, useContext, useReducer } from "react";
import apiRequest from "../../api/apiRequest";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  token: localStorage.getItem("token") || null, // need to test that
};

function reducer(state, action) {
  switch (action.type) {
    case "update-user": {
      const { token, user } = action.payload;
      return { ...state, user, token, isAuthenticated: true };
    }
    case "logout":
      return { ...initialState, token: null };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, token }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function register({ username, password, instrument }) {
    const payload = {
      url: `/auth/signup`,
      method: "POST",
      data: { username, password, instrument },
    };
    const { user, token } = await apiRequest(payload);

    dispatch({
      type: "update-user",
      payload: { user, token },
    });

    return true;
  }

  async function login({ username, password }) {
    const { user, token } = await apiRequest({
      url: `/auth/login`,
      method: "POST",
      data: { username, password },
    });

    dispatch({
      type: "update-user",
      payload: { user, token },
    });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, token, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
