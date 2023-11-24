import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "./firebase-key";
import Spinner from "../shared/Spinner";
import axios from "axios";
import { baseUrl } from "../shared/useAxios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        axios
          .post(`${baseUrl}/jwt`, loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
          });
      } else {
        axios
          .post(`${baseUrl}/logout`, loggedUser, { withCredentials: true })
          .then((res) => {
            console.log(res.data);
          });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  const provider = new GoogleAuthProvider();

  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const createUser = (email, passwords) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, passwords);
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    handleAlert("warning", "User LoggedOut");
    return signOut(auth);
  };

  const handleAlert = (type, message) => {
    Swal.fire({
      icon: type,
      title: message,
    });
  };

  const authInfo = {
    handleAlert,
    loading,
    user,
    createUser,
    logIn,
    logOut,
    googleLogIn,
    setLoading,
  };

  if (loading) {
    return <Spinner></Spinner>;
  } else {
    return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
  }
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
