import { createContext, useContext, useReducer } from "react";
import apiRequest from "../api/apiRequest";
import toast from "react-hot-toast";

const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
};

function reducer(_state, action) {
  switch (action.type) {
    case "set-user": {
      const { token, user } = action.payload;
      return { user, token };
    }
    case "logout":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, token }, dispatch] = useReducer(reducer, initialState);

  async function register({ username, password, instrument, role }) {
    if (instrument === "") instrument = "none";
    const payload = {
      url: `/auth/signup`,
      method: "POST",
      data: { username, password, instrument, role },
    };
    const { user, token } = await apiRequest(payload);
    if (user) {
      toast.success("Registration successful!");
    }
    dispatch({
      type: "set-user",
      payload: { user, token },
    });
  }

  async function login({ username, password }) {
    const { user, token } = await apiRequest({
      url: `/auth/login`,
      method: "POST",
      data: { username, password },
    });
    if (user) {
      toast.success("Login successful!");
    }
    dispatch({
      type: "set-user",
      payload: { user, token },
    });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuthContext };
