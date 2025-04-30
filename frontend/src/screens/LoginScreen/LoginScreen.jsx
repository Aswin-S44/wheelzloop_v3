import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { InputBase, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./LoginScreen.css";
import { useAuthStore } from "../../store/useAuthStore";

function LoginScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    emailOrPhone: "",
    password: "",
  };

  const validationSchema = Yup.object({
    emailOrPhone: Yup.string().required("Email or phone number is required"),
    password: Yup.string().required("Password is required"),
  });

  const { login } = useAuthStore();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const loginData = {
        email: values.emailOrPhone,
        password: values.password,
      };

      setLoading(true);
      const res = await login(loginData);
      setLoading(false);

      if (res) {
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-screen">
      <div className="container p-4">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/images/intro.png"
              className="w-100"
              // loading="lazy"
              alt="Login"
              title="login page image"
            />
          </div>
          <div className="col-md-6">
            <h1 className="font-lg">
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
                      className="search-input-2"
                      style={{ border: "1px solid grey", width: "100%" }}
                    />
                    <ErrorMessage
                      name="emailOrPhone"
                      component="div"
                      className="error-text"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="font-sm">Password</p>
                    <Field
                      as={InputBase}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="search-input-2"
                      style={{
                        border: "1px solid grey",
                        padding: "15px",
                        width: "100%",
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
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
