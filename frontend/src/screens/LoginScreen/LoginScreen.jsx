import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { useAuthStore } from "../../store/useAuthStore";

function LoginScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();

  const initialValues = {
    emailOrPhone: "",
    password: "",
  };

  const validationSchema = Yup.object({
    emailOrPhone: Yup.string().required("Email or phone number is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const res = await login({
        email: values.emailOrPhone,
        password: values.password,
      });

      if (res) {
        Swal.fire({
          title: "Welcome Back!",
          text: "Login successful",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          title: "Access Denied",
          text: "Invalid Credentials",
          icon: "error",
          confirmButtonColor: "#d32f2f",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(/images/intro.png)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0))",
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            padding: 8,
          }}
        >
          <Typography variant="h2" color="white" fontWeight="bold">
            CarAuras
          </Typography>
          <Typography variant="h5" color="white" sx={{ mt: 2, opacity: 0.9 }}>
            Drive your dream today.
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 4,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 450,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            fontWeight="bold"
            gutterBottom
          >
            Sign In
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            align="center"
            sx={{ mb: 4 }}
          >
            Welcome back to{" "}
            <span style={{ color: "#1976d2", fontWeight: 600 }}>CarAuras</span>
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form style={{ width: "100%" }} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="emailOrPhone"
                  label="Email or Phone Number"
                  name="emailOrPhone"
                  autoComplete="email"
                  autoFocus
                  value={values.emailOrPhone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.emailOrPhone && Boolean(errors.emailOrPhone)}
                  helperText={touched.emailOrPhone && errors.emailOrPhone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    mt: 4,
                    mb: 2,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    borderRadius: 2,
                    textTransform: "none",
                    background:
                      "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                  }}
                >
                  {loading ? "Authenticating..." : "Sign In"}
                </Button>

                <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
                  <Grid item>
                    <Link
                      to="/forgot-password"
                      style={{
                        textDecoration: "none",
                        color: "#1976d2",
                        fontSize: "0.9rem",
                      }}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      to="/signup"
                      style={{
                        textDecoration: "none",
                        color: "#1976d2",
                        fontSize: "0.9rem",
                      }}
                    >
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 4, textAlign: "center" }}>
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      color: "#757575",
                      fontSize: "0.875rem",
                    }}
                  >
                    &larr; Back to Home
                  </Link>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginScreen;
