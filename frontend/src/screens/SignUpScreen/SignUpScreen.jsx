import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { IconButton, InputBase } from "@mui/material";
import { districtsInKerala } from "../../dummyData/discticts";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./SignUpScreen.css";
import ComboBox from "../../components/ComboBox/ComboBox";

function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const initialValues = {
    firstName: "",
    location: "",
    email: "",
    phoneNumber: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    location: Yup.string().required("Location is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Invalid phone number")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // setLoading(true);
      // const response = await signUp(values);
      // setLoading(false);
      // if (response.success) {
      //   Swal.fire({
      //     title: "Success!",
      //     text: "Account created successfully",
      //     icon: "success",
      //   });
      //   resetForm();
      //   setTimeout(() => {
      //     navigate("/update-profile");
      //   }, 1000);
      // } else {
      //   Swal.fire({
      //     title: "Error",
      //     text: response.message || "Something went wrong",
      //     icon: "error",
      //   });
      // }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: "Unable to process request",
        icon: "error",
      });
    }
  };

  return (
    <section className="sign-up-screen">
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6">
            <img
              src="https://img.freepik.com/free-vector/features-overview-concept-illustration_114360-1481.jpg"
              alt="Sign Up"
              className="w-100 mt-5"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="font-lg">
              Welcome to <span className="highlighted">WheeelzLoop</span>
            </h1>
            <p className="font-sm-2">
              The easiest and most convenient platform for buying and selling
              cars, designed to provide a hassle-free experience for users.
            </p>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className="mt-5">
                    <p className="font-sm">
                      Full Name{" "}
                      <span style={{ fontWeight: 500 }}>
                        (This will appear to buyers)
                      </span>
                    </p>
                    <Field
                      as={InputBase}
                      name="firstName"
                      placeholder="Full Name"
                      className="search-input"
                      style={{ border: "1px solid grey", width: "100%" }}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="error-text"
                    />
                  </div>
                  <div className="mt-5">
                    <p className="font-sm">Location</p>
                    <ComboBox
                      options={districtsInKerala}
                      value={values.location || ""}
                      onChange={(e, newValue) =>
                        setFieldValue("location", newValue)
                      }
                    />
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="error-text"
                    />
                  </div>

                  <div className="mt-5">
                    <p className="font-sm">
                      Email{" "}
                      <span style={{ fontWeight: 500 }}>
                        (Note: This email is used for OTP verification)
                      </span>
                    </p>
                    <Field
                      as={InputBase}
                      name="email"
                      placeholder="Email"
                      className="search-input"
                      style={{ border: "1px solid grey", width: "100%" }}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-text"
                    />
                  </div>
                  <div className="mt-5">
                    <p className="font-sm">Phone Number</p>
                    <Field
                      as={InputBase}
                      name="phoneNumber"
                      placeholder="Phone number"
                      className="search-input"
                      style={{ border: "1px solid grey", width: "100%" }}
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="error-text"
                    />
                  </div>
                  <div
                    className="mt-5"
                    style={{ position: "relative", width: "100%" }}
                  >
                    <p className="font-sm">Password</p>
                    <Field
                      as={InputBase}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="search-input"
                      style={{
                        border: "1px solid grey",
                        padding: "10px 40px 10px 10px",
                        width: "100%",
                        borderRadius: "4px",
                      }}
                    />
                    <IconButton
                      onClick={togglePasswordVisibility}
                      style={{
                        position: "absolute",
                        top: "65%",
                        right: "10px",
                        transform: "translateY(-100%)",
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-text"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-100 highlighted-btn mt-5"
                    disabled={loading}
                    aria-label="Search for used cars"
                  >
                    {loading ? "Signing Up..." : "Sign-Up"}
                  </button>
                </Form>
              )}
            </Formik>
            <div className="mt-4">
              <a href="/signin" className="link">
                Already have an account?
              </a>
            </div>
            <a href="/forgot-password" className="link">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpScreen;
