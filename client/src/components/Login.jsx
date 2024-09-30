import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import app from "../firebase/firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import useAuth from "../hooks/User";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

const handleLogin = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      console.error("Sign-in error:", error);
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData?.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(credential, email);
    });
};

const Login = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth(); // Get user and loading status from useAuth hook

  // Redirect to home page if user is logged in
  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  return (
    <div className="loginpage">
      <img src="https://res.cloudinary.com/ddzkomshk/image/upload/v1714490622/ktmozybe6rxsn2mw40fa.png" alt="Login" className="loginimg"/>
      <div>
        <button
          className="bg-primary px-8 py-2 text-white"
          onClick={handleLogin}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
