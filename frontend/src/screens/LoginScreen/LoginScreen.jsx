import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { InputBase } from "@mui/material";
// import { login } from "../../services/apis";
import "./LoginScreen.css";

function LoginScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
      // setLoading(true);
      // const response = await login(values);
      // setLoading(false);
      // if (response.success) {
      //   localStorage.setItem("user", JSON.stringify(response.user));
      //   Swal.fire({
      //     title: "Good job!",
      //     text: "Successfully logged in",
      //     icon: "success",
      //   });
      //   setTimeout(() => navigate("/"), 1000);
      // } else {
      //   Swal.fire({
      //     title: "Error",
      //     text: response.message || "Invalid credentials",
      //     icon: "error",
      //   });
      // }
    } catch (error) {
      setLoading(false);
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
              src="https://img.freepik.com/free-vector/features-overview-concept-illustration_114360-1481.jpg"
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
