import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  token: null,
};

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    requestStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    requestSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = {
        email: action.payload.email,
        userId: action.payload.userId,
      };
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("email", action.payload.email);
    },

    requestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.clear();
    },
    logout: (state) => {
      state.error = null;
      state.loading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { requestStart, requestSuccess, requestFailure, logout } =
  AuthSlice.actions;

export default AuthSlice.reducer;

export const loginUser = (payload, navigate) => async (dispatch) => {
  const { email, password } = payload;

  try {
    dispatch(requestStart());
    const { data, status } = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
      {
        email,
        password,
      }
    );

    if (status == 200) {
      toast.success(data?.message || "Login Successful");
      navigate("/");
      return dispatch(requestSuccess(data));
    }
  } catch (error) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    if (status === 404) {
      toast.error(message || "User not found, please check your credentials");
      return dispatch(requestFailure(message));
    }

    if (status === 400) {
      toast.error(message || "All fields are required");
      return dispatch(requestFailure(message));
    }

    if (status === 401) {
      toast.error(message || "Wrong password, please try again");
      return dispatch(requestFailure(message));
    }

    // Default fallback
    toast.error("Something went wrong, please try again later");
    return dispatch(requestFailure(message));
  }
};
export const signupUser = (payload, navigate) => async (dispatch) => {
  const { mobile, name, email, password } = payload;

  try {
    dispatch(requestStart());

    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/signup`,
      { name, email, mobile, password }
    );

    // success only
    toast.success(res.data?.message || "Signup successful");
    navigate("/");
    return dispatch(requestSuccess(res.data));
  } catch (error) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    if (status === 409) {
      toast.error(message || "User already exists");
      return dispatch(requestFailure(message));
    }

    if (status === 400) {
      toast.error(message || "All fields are required");
      return dispatch(requestFailure(message));
    }

    // server error
    toast.error(message || "Something went wrong, please try again");
    return dispatch(requestFailure(message));
  }
};
export const logoutUser = () => (dispatch) => {
  Swal.fire({
    title: "Your Going to logged out",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    showConfirmButton: true,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "yes, Logged out",
  }).then((res) => {
    if (res.isConfirmed) {
      Swal.fire({
        title: "You Logged Out",
        icon: "success",
      });
      dispatch(logout());
      toast.error("You Logged Out");
    }
  });
};
