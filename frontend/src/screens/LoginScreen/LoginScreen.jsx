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
          window.location.reload();
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
    } finally {
      setLoading(false);
    }
    setSubmitting(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="login-left">
          <img
            src="/images/intro.png"
            className="login-image"
            alt="Login"
            title="login page image"
          />
        </div>
        <div className="login-right">
          <div className="login-header">
            <h1 className="login-title">
              Sign-In to <span className="highlighted">WheeelzLoop</span>
            </h1>
            <p className="login-subtitle">
              The easiest and most convenient platform for buying and selling
              cars.
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="login-form">
                <div className="form-group">
                  <label className="form-label">Email or Phone Number</label>
                  <Field
                    as={InputBase}
                    name="emailOrPhone"
                    placeholder="Enter your email or phone"
                    className="form-input"
                  />
                  <ErrorMessage
                    name="emailOrPhone"
                    component="div"
                    className="error-text"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <Field
                    as={InputBase}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="form-input"
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
                  className="login-button"
                  disabled={isSubmitting || loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </Form>
            )}
          </Formik>
          <div className="login-footer">
            <a href="/" className="login-link">
              Back to Home? <span>Wheelzloop</span>
            </a>
            <a href="/signup" className="login-link">
              Don't have an account? <span>Sign Up</span>
            </a>
            <a href="/forgot-password" className="login-link">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
