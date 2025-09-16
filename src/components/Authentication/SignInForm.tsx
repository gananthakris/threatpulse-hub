"use client";

import * as React from "react";
import {
  Grid,
  Button,
  Box,
  Typography,
  FormControl,
  TextField,
  Collapse,
  Alert,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/providers/AuthProvider";

const SignInForm: React.FC = () => {
  const { signIn, signUp, confirmSignup, error, isLoading } = useAuth();
  const [showEmailLogin, setShowEmailLogin] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmationCode, setConfirmationCode] = React.useState("");

  // Login handler for social buttons
  const handleSocialLogin = async () => {
    try {
      await signIn('Google');
    } catch (err) {
      console.error('Social login failed:', err);
    }
  };

  // Login/Signup handler for form submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (showConfirmation) {
      // Handle confirmation code
      try {
        await confirmSignup(email, confirmationCode);
        setShowConfirmation(false);
        setIsSignUp(false);
        // Sign in after successful confirmation
        await signIn('Email', { email, password });
      } catch (err) {
        console.error('Confirmation failed:', err);
      }
    } else if (isSignUp) {
      // Handle sign up
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      try {
        await signUp(email, password);
        setShowConfirmation(true);
      } catch (err) {
        console.error('Sign up failed:', err);
      }
    } else {
      // Handle sign in
      try {
        await signIn('Email', { email, password });
      } catch (err) {
        console.error('Sign in failed:', err);
      }
    }
  };

  const toggleEmailLogin = () => {
    setShowEmailLogin(!showEmailLogin);
  };
  return (
    <>
      <Box
        className="auth-main-wrapper sign-in-area"
        sx={{
          py: { xs: "40px", md: "50px", lg: "60px", xl: "60px" },
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: { sm: "500px", md: "1255px" },
            mx: "auto !important",
            px: "12px",
          }}
        >
          <Grid
            container
            alignItems="center"
            columnSpacing={{ xs: 1, sm: 2, md: 4, lg: 3 }}
          >
            <Grid size={{ xs: 12, md: 6, lg: 6, xl: 7 }}>
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                }}
              >
                <Image
                  src="/images/sign-in.jpg"
                  alt="sign-in-image"
                  width={500}
                  height={620}
                  style={{
                    borderRadius: "24px",
                    width: '100%',
                    height: 'auto',
                    maxHeight: '75vh',
                    objectFit: 'cover'
                  }}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 6, xl: 5 }}>
              <Box
                className="form-content"
                sx={{
                  paddingLeft: { xs: "0", lg: "10px" },
                }}
              >
                <Box
                  className="logo"
                  sx={{
                    mb: "23px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '32px',
                      fontWeight: 700,
                      color: '#605dff',
                      letterSpacing: '-0.5px'
                    }}
                  >
                    ThreatPulse
                  </Typography>
                </Box>

                <Box
                  className="title"
                  sx={{
                    mb: "23px",
                  }}
                >
                  <Typography
                    variant="h1"
                    className="text-black"
                    sx={{
                      fontSize: { xs: "22px", sm: "25px", lg: "28px" },
                      mb: "7px",
                      fontWeight: "600",
                    }}
                  >
                    {isSignUp ? 'Create your account' : 'Welcome back to ThreatPulse!'}
                  </Typography>

                  <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                    {isSignUp ? 'Create your account with email' : 'Sign in with your email'}
                  </Typography>
                </Box>

                {/* Google OAuth temporarily disabled - uncomment when configured */}
                {/* <Box
                  className="with-socials"
                  sx={{
                    mb: "20px",
                  }}
                >
                  <Button
                    variant="outlined"
                    className="border bg-white"
                    onClick={handleSocialLogin}
                    disabled={isLoading}
                    sx={{
                      width: "100%",
                      borderRadius: "8px",
                      padding: "10.5px 20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <Image
                      src="/images/icons/google.svg"
                      alt="google"
                      width={25}
                      height={25}
                    />
                    <Typography sx={{ fontWeight: 500, color: "#757575" }}>
                      Sign in with Google
                    </Typography>
                  </Button>
                </Box> */}

                {/* Email sign in section */}
                <Box sx={{ my: 3, textAlign: "center" }}>
                  
                  {/* Toggle link for email login */}
                  <Button
                    onClick={toggleEmailLogin}
                    sx={{
                      textTransform: "none",
                      color: "#605dff",
                      fontSize: "14px",
                      fontWeight: 500,
                      "&:hover": {
                        backgroundColor: "transparent",
                        textDecoration: "underline"
                      }
                    }}
                    startIcon={
                      <Typography sx={{ fontSize: "16px" }}>
                        {showEmailLogin ? "▲" : "▼"}
                      </Typography>
                    }
                  >
                    Use email instead
                  </Button>
                </Box>

                {/* Collapsible email form */}
                <Collapse in={showEmailLogin}>
                <Box 
                  component="form" 
                  onSubmit={handleFormSubmit}
                >
                  {error && (
                    <Box mb="15px">
                      <Alert severity="error">{error}</Alert>
                    </Box>
                  )}
                  <Box mb="15px">
                    <FormControl fullWidth>
                      <Typography
                        component="label"
                        sx={{
                          fontWeight: "500",
                          fontSize: "14px",
                          mb: "10px",
                          display: "block",
                        }}
                        className="text-black"
                      >
                        Email Address
                      </Typography>

                      <TextField
                        label="example&#64;trezo.com"
                        variant="filled"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                          "& .MuiInputBase-root": {
                            border: "1px solid #D5D9E2",
                            backgroundColor: "#fff",
                            borderRadius: "7px",
                          },
                          "& .MuiInputBase-root::before": {
                            border: "none",
                          },
                          "& .MuiInputBase-root:hover::before": {
                            border: "none",
                          },
                          "& .MuiInputBase-root:hover:hover:not(.Mui-disabled, .Mui-error)::before":
                            {
                              border: "none",
                            },
                        }}
                      />
                    </FormControl>
                  </Box>

                  <Box mb="15px">
                    <FormControl fullWidth>
                      <Typography
                        component="label"
                        sx={{
                          fontWeight: "500",
                          fontSize: "14px",
                          mb: "10px",
                          display: "block",
                        }}
                        className="text-black"
                      >
                        Password
                      </Typography>

                      <TextField
                        label="Type Password"
                        variant="filled"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                          "& .MuiInputBase-root": {
                            border: "1px solid #D5D9E2",
                            backgroundColor: "#fff",
                            borderRadius: "7px",
                          },
                          "& .MuiInputBase-root::before": {
                            border: "none",
                          },
                          "& .MuiInputBase-root:hover::before": {
                            border: "none",
                          },
                          "& .MuiInputBase-root:hover:hover:not(.Mui-disabled, .Mui-error)::before":
                            {
                              border: "none",
                            },
                        }}
                      />
                    </FormControl>
                  </Box>

                  {/* Confirm Password field for Sign Up */}
                  {isSignUp && !showConfirmation && (
                    <Box mb="15px">
                      <FormControl fullWidth>
                        <Typography
                          component="label"
                          sx={{
                            fontWeight: "500",
                            fontSize: "14px",
                            mb: "10px",
                            display: "block",
                          }}
                          className="text-black"
                        >
                          Confirm Password
                        </Typography>

                        <TextField
                          label="Confirm Password"
                          variant="filled"
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          sx={{
                            "& .MuiInputBase-root": {
                              border: "1px solid #D5D9E2",
                              backgroundColor: "#fff",
                              borderRadius: "7px",
                            },
                            "& .MuiInputBase-root::before": {
                              border: "none",
                            },
                            "& .MuiInputBase-root:hover::before": {
                              border: "none",
                            },
                            "& .MuiInputBase-root:hover:hover:not(.Mui-disabled, .Mui-error)::before":
                              {
                                border: "none",
                              },
                          }}
                        />
                      </FormControl>
                    </Box>
                  )}

                  {/* Confirmation Code field */}
                  {showConfirmation && (
                    <Box mb="15px">
                      <FormControl fullWidth>
                        <Typography
                          component="label"
                          sx={{
                            fontWeight: "500",
                            fontSize: "14px",
                            mb: "10px",
                            display: "block",
                          }}
                          className="text-black"
                        >
                          Verification Code
                        </Typography>

                        <TextField
                          label="Enter code sent to your email"
                          variant="filled"
                          type="text"
                          id="confirmationCode"
                          name="confirmationCode"
                          value={confirmationCode}
                          onChange={(e) => setConfirmationCode(e.target.value)}
                          sx={{
                            "& .MuiInputBase-root": {
                              border: "1px solid #D5D9E2",
                              backgroundColor: "#fff",
                              borderRadius: "7px",
                            },
                            "& .MuiInputBase-root::before": {
                              border: "none",
                            },
                            "& .MuiInputBase-root:hover::before": {
                              border: "none",
                            },
                            "& .MuiInputBase-root:hover:hover:not(.Mui-disabled, .Mui-error)::before":
                              {
                                border: "none",
                              },
                          }}
                        />
                      </FormControl>
                    </Box>
                  )}

                  {!isSignUp && (
                    <Box mb="20px">
                      <Link
                        href="/authentication/forgot-password/"
                        className="text-primary"
                        style={{
                          fontWeight: "500",
                        }}
                      >
                        Forgot Password?
                      </Link>
                    </Box>
                  )}

                  <Box mb="20px">
                    <Button
                      type="submit"
                      variant="contained" 
                      disabled={isLoading}
                      sx={{
                        textTransform: "capitalize",
                        borderRadius: "6px",
                        fontWeight: "500",
                        fontSize: { xs: "13px", sm: "16px" },
                        padding: { xs: "10px 20px", sm: "10px 24px" },
                        color: "#fff !important",
                        boxShadow: "none",
                        width: "100%",

                        // Disabled state styles
                        "&.Mui-disabled": {
                          backgroundColor: "#000", // Light gray background
                          color: "#9e9e9e !important", // Darker gray text
                          cursor: "not-allowed",
                        },
                      }}
                    >
                      <i className="material-symbols-outlined mr-5">{showConfirmation ? 'check' : isSignUp ? 'person_add' : 'login'}</i>
                      {showConfirmation ? 'Verify Email' : isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                  </Box>

                  <Typography>
                    {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                    <Button
                      onClick={() => {
                        setIsSignUp(!isSignUp);
                        setShowConfirmation(false);
                      }}
                      sx={{
                        p: 0,
                        minWidth: 'auto',
                        color: '#605dff',
                        fontWeight: 500,
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {isSignUp ? 'Sign In' : 'Sign Up'}
                    </Button>
                  </Typography>
                </Box>
                </Collapse>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default SignInForm;
