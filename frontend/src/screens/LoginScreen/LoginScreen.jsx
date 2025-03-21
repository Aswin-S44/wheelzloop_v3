import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { InputBase } from "@mui/material";
import "./LoginScreen.css";
import axios from "axios";
import { SIGN_IN_URL } from "../../config/api";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../actions/userActions";

function LoginScreen() {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const initialValues = {
    emailOrPhone: "",
    password: "",
  };

  const validationSchema = Yup.object({
    emailOrPhone: Yup.string().required("Email or phone number is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const loginData = {
        email: values.emailOrPhone,
        password: values.password,
      };

      const res = await axios.post(SIGN_IN_URL, loginData, {
        withCredentials: true,
      });

      if (res && res.status == 201) {
        Swal.fire({
          title: "Success!",
          text: "Logged in successfully",
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Invalid Credentials",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({ title: "Error", text: "Invalid credentials", icon: "error" });
    }
    setSubmitting(false);
  };

  return (
    <div className="login-screen">
      <div className="container p-4">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/images/login-im.avif"
              className="w-100"
              loading="lazy"
              alt="Login"
            />
          </div>
          <div className="col-md-6">
            <h1 className="font-lg ">
              Sign-In to <span className="highlighted">WheeelzLoop</span>
            </h1>
            <p className="font-sm-2">
              The easiest and most convenient platform for buying and selling
              cars.
            </p>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mt-5">
                    <p className="font-sm">Email or Phone Number</p>
                    <Field
                      as={InputBase}
                      name="emailOrPhone"
                      placeholder="Email or Phone Number"
                      className="search-input"
                      style={{ border: "1px solid grey", width: "100%" }}
                    />
                    <ErrorMessage
                      name="emailOrPhone"
                      component="div"
                      className="error-text"
                    />
                  </div>
                  <div className="mt-5">
                    <p className="font-sm">Password</p>
                    <Field
                      as={InputBase}
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="search-input"
                      style={{
                        border: "1px solid grey",
                        padding: "15px",
                        width: "100%",
                      }}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-text"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-100 highlighted-btn mt-5"
                    disabled={isSubmitting || loading}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                </Form>
              )}
            </Formik>
            <div className="mt-4">
              <a href="/signup" className="link">
                Don't have an account? Sign Up
              </a>
            </div>
            <a href="/forgot-password" className="link">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
