
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Login from "./Login";
import Signup from "./SignUp";

const Regesteration = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false); // To manage flip state on smaller screens

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 64px)",
        bgcolor: "#f0f0f0",
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: "400px", md: "990px" },
          height: { xs: "500px", sm: "500px", md: "520px" },
          position: "relative",
          borderRadius: 12,
          overflow: "hidden",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.35)",
          perspective: "1000px", // Perspective for flip animation
        }}
      >
        {/* Card Flip Container for Smaller Screens */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transformStyle: "preserve-3d",
            transition: "transform 0.6s ease-in-out",
            display: { xs: "block", md: "none" },
          }}
        >
          {/* Front Face (Login) */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              backfaceVisibility: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#fff",
            }}
          >
            <Login />
            <Typography
              sx={{
                fontSize: "13px",
                mt: 2,
                color: "#555",
                textAlign: "center",
              }}
            >
              Don't have an account?{" "}
              <Box
                component="span"
                sx={{
                  color: "#ee6c4d",
                  textTransform: "lowercase",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
                onClick={() => setIsFlipped(true)}
              >
                Sign Up
              </Box>
            </Typography>
          </Box>

          {/* Back Face (Signup) */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#fff",
            }}
          >

            <Signup />
            <Typography
              sx={{
                fontSize: "13px",
                mt: 2,
                color: "#555",
                textAlign: "center",
              }}
            >
              Already have an account?{" "}
              <Box 
              component={"span"}
              sx={{
                color: "#ee6c4d",
                textTransform: "lowercase",
                cursor: "pointer",
                fontSize: "14px",
              }}
              onClick={() => setIsFlipped(false)}
            >
              Log In
            </Box>
            </Typography>
            
          </Box>
        </Box>

        {/* Full View for Larger Screens */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: { xs: "none", md: "flex" },
          }}
        >
          {/* Left Panel */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: isLogin ? 0 : "50%",
              width: "50%",
              height: "100%",
              bgcolor: "#ee6c4d",
              borderRadius: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              zIndex: 2,
              transition: "all 0.6s ease-in-out",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ textShadow: "1px 3px 3px #b5adad" }}
            >
              {isLogin ? "Join Us Today!" : "Welcome Back!"}
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "400",
                letterSpacing: "0.4px",
                lineHeight: "1.6",
              }}
            >
              {isLogin
                ? "Already have an account? Log in with your credentials."
                : "Don't have an account? Register with your personal information."}
            </Typography>
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                backgroundColor: "#ee6c4d",
                width: "150px",
                letterSpacing: " 0.5px",
                margin: "10px 0px",
                cursor: "pointer",
                border: "1px solid white",
                borderRadius: "8px",
                mt: "50px",
              }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Log In" : "Sign Up"}
            </Button>
          </Box>

          {/* Forms Container */}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              transition: "transform 0.6s ease-in-out",
            }}
          >
            {/* Login Form */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#fff",
              }}
            >
              <Login />
            </Box>

            {/* Sign Up Form */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#fff",
              }}
            >
              <Signup />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Regesteration;
