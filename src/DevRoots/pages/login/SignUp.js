import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  List,
  IconButton,
  Stack,
  Tooltip,
  ListItem,
  Snackbar,
  Alert,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  // username

  const [isActive, setIsActive] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  // Username Validation
  const [username, setUsername] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [usernameTooltipOpen, setUsernameTooltipOpen] = useState(false); // State for username tooltip

  const validateUsername = (value) => {
    const usernamePattern = /^(?=.*[a-zA-Z]{3})(?=.*[0-9]{2})[a-zA-Z0-9]+$/;
    return usernamePattern.test(value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsValidUsername(validateUsername(e.target.value));
  };

  const handleUsernameFocus = () => {
    setUsernameTooltipOpen(true);
  };

  const handleUsernameBlur = () => {
    setUsernameTooltipOpen(false);
  };

  // Email Validation
  const [signInEmail, setSignInEmail] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailTooltipOpen, setEmailTooltipOpen] = useState(false); // State for email tooltip

  const handleEmailChange = (e) => {
    const newEmail = e.target.value; // Store the new email value
    setEmail(newEmail);

    // Validate email and set error state
    const emailPattern = /^[a-zA-Z0-9]{6,}(\.[a-zA-Z0-9]+)*@gmail\.com$/; // Simple email regex pattern
    const isValid = emailPattern.test(newEmail); // Check validity of new email
    setEmailError(!isValid);

    // Show tooltip if the email is invalid and the input is not empty
    setEmailTooltipOpen(!isValid && newEmail.length > 0);
  };

  // Show tooltip on focus; hide if valid email
  const handleEmailFocus = () => {
    const emailPattern = /^[a-zA-Z0-9]{3,}(\.[a-zA-Z0-9]+)*@gmail\.com$/; // Simple email regex pattern
    const isValid = emailPattern.test(email); // Check validity of the current email
    setEmailTooltipOpen(!isValid); // Show tooltip if the email is invalid
  };

  // Hide tooltip when focus is lost
  const handleEmailBlur = () => {
    setEmailTooltipOpen(false); // Hide tooltip when focus is lost
  };

  /////////////////////////////////////////////////

  //Password Validaion
  const [signUpPassword, setSignUpPassword] = useState(""); // Password for sign-up
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [ConfirmtooltipOpen, setConfirmTooltipOpen] = useState(false);

  const validations = {
    minLength: signUpPassword.length >= 8,
    hasUpperCase: /[A-Z]/.test(signUpPassword),
    hasLowerCase: /[a-z]/.test(signUpPassword),
    hasNumber: /[0-9]/.test(signUpPassword),
    hasSpecialChar: /[!@#$%^&*]/.test(signUpPassword),
    match:
      signUpPassword && confirmPassword
        ? confirmPassword === signUpPassword
        : false,
  };
  const validationCriteria = [
    { label: "At least 8 characters", valid: validations.minLength },
    { label: "At least one uppercase letter", valid: validations.hasUpperCase },
    { label: "At least one lowercase letter", valid: validations.hasLowerCase },
    { label: "At least one number", valid: validations.hasNumber },
    {
      label: "At least one special character",
      valid: validations.hasSpecialChar,
    },
  ];
  const ConfirmValidationCriteria = [
    { label: "Passwords match", valid: validations.match },
  ];
  const handleToggleShowPassword = () => setShowPassword(!showPassword);

  /////////////////////////////////////////////////
  //form handling

  const handleSignUpSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Check if any of the fields are empty
    if (!validateUsername(username)) {
      setIsValidUsername(false);
      setUsernameTooltipOpen(true);
    } else {
      setIsValidUsername(true);
      setUsernameTooltipOpen(false);
    }
    const emailPattern = /^[a-zA-Z0-9]{3,}(\.[a-zA-Z0-9]+)*@gmail\.com$/;
    const isValidEmail = emailPattern.test(email);
    setEmailError(!isValidEmail);
    setEmailTooltipOpen(!isValidEmail);

    const isPasswordValid = validationCriteria.every((item) => item.valid);
    const isConfirmPasswordValid =
      confirmPassword !== "" && confirmPassword === signUpPassword;

    if (!isPasswordValid) {
      setTooltipOpen(true); // إظهار التولتيب الخاص بـ Password
      setConfirmTooltipOpen(false); // إخفاء التولتيب الخاص بـ Confirm Password
      return;
    }

    // إذا كانت كلمة المرور صحيحة، ولكن Confirm Password غير مطابق
    if (confirmPassword !== signUpPassword) {
      setTooltipOpen(false); // إخفاء التولتيب الخاص بـ Password
      setConfirmTooltipOpen(true); // إظهار التولتيب الخاص بـ Confirm Password
      return;
    }

    // إذا كانت جميع الشروط صحيحة، قم بإرسال البيانات
    setTooltipOpen(false);
    setConfirmTooltipOpen(false);

    if (!username || !email || !signUpPassword || !confirmPassword) {
      return;
    }

    // Proceed with form submission if all fields are filled
    if (
      isValidUsername &&
      !emailError &&
      validationCriteria &&
      ConfirmValidationCriteria
    ) {
      // Submit form

      onSubmit({
        username: username.trim(),
        password: signUpPassword.trim(),
        email: email.trim(),
        confirmPassword: confirmPassword.trim(),
      });
    } else {
    }
  };
  /////////////////////////////////////////////////
  //Token , RefreshToken
  axios.interceptors.request.use((request) => {
    console.log("Starting Request", JSON.stringify(request.data, null, 2));
    return request;
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const SignUpData = {
      ...data,
    };

    // signup api
    try {
      const response = await axios.post(
        "https://careerguidance.runasp.net/Auth/SignUp",

        SignUpData
      );
      const { role, accessToken, token, refreshToken, ...otherData } =
        response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("refreshToken", refreshToken);

      console.log("Sign-up successful:", response.data);
      handleClick(); // Show success Snackbar
      navigate("/"); // Redirect to home page after successful signup
      localStorage.setItem("user", JSON.stringify({ role, ...otherData }));
      window.location.reload();
    } catch (error) {
      console.log("Error during API call: ", error);

      if (
        (error.response && error.response.status === 400) ||
        (error.response && error.response.status === 409) ||
        (error.response && error.response.status === 401)
      ) {
        const errorMessage =
          error.response.data.errors[1] || error.response.data.errors[0];
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
      setOpenSnackbar(true);
    }

    const getToken = () => {
      return localStorage.getItem("authToken"); // Match the storage key used in SignUp
    };

    const getRefreshToken = () => {
      return localStorage.getItem("refreshToken"); // Match the storage key used in SignUp
    };

    const fetchData = async () => {
      const token = getToken();

      try {
        const response = await axios.get("https://yourapi.com/endpoint", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Data fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);

        // Optionally handle token expiration and refresh
        if (error.response && error.response.status === 401) {
          console.log("Token expired, refreshing...");
          await refreshAccessToken(); // Implement refresh logic
        }
      }
    };

    const refreshAccessToken = async () => {
      const refreshToken = getRefreshToken();

      try {
        const response = await axios.post(
          "https://careerguidance.runasp.net/Auth/RefreshToken",
          {
            refreshToken: refreshToken,
          }
        );

        // Store the new access token
        localStorage.setItem("authToken", response.data.accessToken); // Update if the key is different
        console.log(
          "Access token refreshed successfully:",
          response.data.accessToken
        );
      } catch (error) {
        console.error("Error refreshing access token:", error);
      }
    };
  };

  // Function to handle closing the Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setErrorMessage(""); // Clear the error message after closing
  };

  const getToken = () => {
    return localStorage.getItem("accessToken");
  };

  const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
  };
  const fetchData = async () => {
    const token = getToken();

    try {
      const response = await axios.get("https://yourapi.com/endpoint", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Data fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);

      //  handle token expiration and refresh
      if (error.response && error.response.status === 401) {
        console.log("Token expired, refreshing...");
        await refreshAccessToken(); // Implement refresh logic
      }
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();

    try {
      const response = await axios.post(
        "https://careerguidance.runasp.net/Auth/RefreshToken",
        {
          refreshToken: refreshToken,
        }
      );

      // Store the new access token
      localStorage.setItem("accessToken", response.data.accessToken);
      console.log(
        "Access token refreshed successfully:",
        response.data.accessToken
      );
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  };

  ///////////////////////////////////
  const handleClick = () => {
    setOpen(true);
  };

  const [open, setOpen] = React.useState(false);
  const googleNavigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleSuccess = async (response) => {
    console.log("Login Success:", response);
    // Decode the credential token
    const credentialResponseDecoded = jwtDecode(response.credential);
    console.log(credentialResponseDecoded);

    // Send the token to your API
    try {
      const apiResponse = await axios.post(
        "https://careerguidance.runasp.net/Auth/Google-Signin",
        {
          token: response.credential,
        }
      );
      console.log("API Response:", apiResponse.data);
      // Handle the API response as needed (e.g., store tokens, navigate, etc.)
      googleNavigate("/");
      const { role, accessToken, refreshToken, ...otherData } =
        apiResponse.data;
      localStorage.setItem("user", JSON.stringify({ role, ...otherData }));
      window.location.reload();
    } catch (error) {
      console.error("API Call Failed:", error);
    }
  };

  const handleFailure = (error) => {
    console.error("Login Failed:", error);
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        px: 4,
      }}
    >
      <form
        onSubmit={handleSignUpSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          fontWeight="bold"
          mb={2}
          sx={{
            color: "#293241",
            fontSize: "30px",
            fontWeight: "bold",
            textShadow: "1px 1px 1px #b5adad",
          }}
        >
          Create Account
        </Typography>

        {/* Username field */}
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <TextField
            placeholder="Username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            onFocus={handleUsernameFocus} // Show tooltip on focus
            error={!isValidUsername} // Show error when username is invalid
            autoComplete="off"
            onBlur={handleUsernameBlur} // Hide tooltip on blur
            sx={{
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 10px transparent inset", // Make the autofill background transparent
                backgroundColor: "transparent",
                WebkitTextFillColor: "#293241", // Maintain your desired text color
                transition: "background-color 5000s ease-in-out 0s", // A trick to override autofill background
              },
              "& input:-webkit-autofill:focus, & input:-webkit-autofill:hover":
                {
                  backgroundColor: "transparent",
                  WebkitBoxShadow: "0 0 0 10px transparent inset", // Keep it transparent on focus/hover
                  transition: "background-color 5000s ease-in-out 0s", // Maintain the background color override
                },
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
                width: "320px",
                height: "37px",
                margin: "0", // Remove default margin from TextField
                border: "1px solid gray",
                "& fieldset": {
                  border: "none", // Remove the default border
                },
              },
              "& .MuiInputBase-root": {
                "&.Mui-focused": {
                  borderColor: "gray", // Remove focus color
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid #ee6c4d",
                      borderLeft: "none",
                      borderTop: "none",
                      borderBottom: "none",
                      borderRadius: "10px 0 0 10px",
                    }}
                  >
                    <PersonIcon
                      style={{
                        color: "#ee6c4d",
                        fontSize: 30,
                        marginRight: 5,
                      }}
                    />
                  </div>
                </InputAdornment>
              ),
            }}
          />
          <Tooltip
            title={
              !isValidUsername
                ? "Username must be start with at least 3 letters, 2 numbers ."
                : ""
            }
            placement="right-start" // Position tooltip to the right
            open={usernameTooltipOpen} // Control tooltip visibility for username
            arrow
            PopperProps={{
              sx: {
                "& .MuiTooltip-tooltip": {
                  backgroundColor: "#f5f5f5", // Set your desired background color here
                  color: "#ee6c4d", // Optional: Set text color for better visibility
                  textTransform: "bold",
                  fontSize: 13,
                },
              },
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [8, -5], // Adjust the second value for top margin (increase as needed)
                  },
                },
              ],
            }}
            children={undefined}
          />
        </Box>
        {/* Email field */}
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <TextField
            placeholder="Email"
            type="email"
            error={emailError} // Control error state
            value={email}
            autoComplete="off"
            onChange={handleEmailChange}
            onFocus={handleEmailFocus} // Show tooltip on focus
            onBlur={handleEmailBlur} // Hide tooltip on blur
            sx={{
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 10px transparent inset", // Make the autofill background transparent
                backgroundColor: "transparent",
                WebkitTextFillColor: "#293241", // Maintain your desired text color
                transition: "background-color 5000s ease-in-out 0s", // A trick to override autofill background
              },
              "& input:-webkit-autofill:focus, & input:-webkit-autofill:hover":
                {
                  backgroundColor: "transparent",
                  WebkitBoxShadow: "0 0 0 10px transparent inset", // Keep it transparent on focus/hover
                  transition: "background-color 5000s ease-in-out 0s", // Maintain the background color override
                },
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
                width: "320px",
                height: "37px",
                margin: "10px 0",
                border: "1px solid gray",
                "& fieldset": {
                  border: "none", // Remove the default border
                },
              },
              "& .MuiInputBase-root": {
                "&.Mui-focused": {
                  borderColor: "gray", // Remove focus color
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid #ee6c4d",
                      borderLeft: "none",
                      borderTop: "none",
                      borderBottom: "none",
                      borderRadius: "10px 0 0 10px",
                    }}
                  >
                    <EmailIcon
                      style={{
                        color: "#ee6c4d",
                        fontSize: 30,
                        marginRight: 5,
                      }}
                    />
                  </div>
                </InputAdornment>
              ),
            }}
          />

          <Tooltip
            title="Please enter a valid email in the format: xxxxxx@gmail.com"
            placement="right-end" // Position tooltip to the right
            open={emailTooltipOpen} // Control tooltip visibility for email
            arrow
            PopperProps={{
              sx: {
                "& .MuiTooltip-tooltip": {
                  backgroundColor: "#f5f5f5", // Set your desired background color here
                  color: "#ee6c4d", // Optional: Set text color for better visibility
                  textTransform: "bold",
                  fontSize: 13,
                },
              },
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [55, -5], // Adjust the second value for top margin (increase as needed)
                  },
                },
              ],
            }}
            children={undefined}
          />
        </Box>
        {/* sign up Password field with tooltip */}
        <Tooltip
          title={
            <Box sx={{ width: 230 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: 13,
                  fontWeight: "bold",
                  color: "#293241",
                }}
              >
                Password Requirements:
              </Typography>
              <List>
                {validationCriteria.map((item, index) => (
                  <ListItem key={index} sx={{ padding: 0, margin: 0 }}>
                    <Typography
                      color={item.valid ? "green" : "red"}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "10px",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {item.valid ? "✔" : "✖"} {item.label}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          }
          open={tooltipOpen}
          placement="right-start" // Position tooltip to the right
          arrow
          PopperProps={{
            sx: {
              "& .MuiTooltip-tooltip": {
                backgroundColor: "#f5f5f5", // Set your desired background color here
                color: "#293241", // Optional: Set text color for better visibility
              },
            },
          }}
        >
          <TextField
            placeholder="Password"
            type="password"
            // type={showPassword ? "text" : "password"}
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
            onFocus={() => setTooltipOpen(true)} // Show tooltip on focus
            onBlur={() => setTooltipOpen(false)} // Hide tooltip on blur
            sx={{
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 10px transparent inset", // Make the autofill background transparent
                backgroundColor: "transparent",
                WebkitTextFillColor: "#293241", // Maintain your desired text color
                transition: "background-color 5000s ease-in-out 0s", // A trick to override autofill background
              },
              "& input:-webkit-autofill:focus, & input:-webkit-autofill:hover":
                {
                  backgroundColor: "transparent",
                  WebkitBoxShadow: "0 0 0 10px transparent inset", // Keep it transparent on focus/hover
                  transition: "background-color 5000s ease-in-out 0s", // Maintain the background color override
                },
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
                width: "320px",
                height: "37px",
                border: "1px solid gray",
                "& fieldset": { border: "none" },
              },
              "& .MuiInputBase-root": {
                "&.Mui-focused": { borderColor: "gray" },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid #ee6c4d",
                      borderLeft: "none",
                      borderTop: "none",
                      borderBottom: "none",
                      borderRadius: "10px 0 0 10px",
                    }}
                  >
                    <LockIcon
                      style={{
                        color: "#ee6c4d",
                        fontSize: 30,
                        marginRight: 5,
                      }}
                    />
                  </div>
                </InputAdornment>
              ),
            }}
          />
        </Tooltip>
        {/* Confirm Password field with tooltip */}
        <Tooltip
          title={
            <Box sx={{ width: 230 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: 13,
                  fontWeight: "bold",
                  color: "#293241",
                }}
              >
                Password Requirements:
              </Typography>
              <List>
                {ConfirmValidationCriteria.map((item, index) => (
                  <ListItem key={index} sx={{ padding: 0, margin: 0 }}>
                    <Typography
                      color={item.valid ? "green" : "red"}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "10px",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {item.valid ? "✔" : "✖"} {item.label}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          }
          open={ConfirmtooltipOpen}
          arrow
          placement="right-start" // Position tooltip to the right
          PopperProps={{
            sx: {
              "& .MuiTooltip-tooltip": {
                backgroundColor: "#f5f5f5", // Set your desired background color here
                color: "#293241", // Optional: Set text color for better visibility
              },
            },
          }}
        >
          <TextField
            placeholder="Confirm Password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onFocus={() => setConfirmTooltipOpen(true)} // Show tooltip on focus
            onBlur={() => setConfirmTooltipOpen(false)} // Hide tooltip on blur
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
                width: "320px",
                height: "37px",
                margin: "10px 0",
                border: "1px solid gray",
                "& fieldset": { border: "none" },
              },
              "& .MuiInputBase-root": {
                "&.Mui-focused": { borderColor: "gray" },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid #ee6c4d",
                      borderLeft: "none",
                      borderTop: "none",
                      borderBottom: "none",
                      borderRadius: "10px 0 0 10px",
                    }}
                  >
                    <EnhancedEncryptionIcon
                      style={{
                        color: "#ee6c4d",
                        fontSize: 30,
                        marginRight: 5,
                      }}
                    />
                  </div>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleToggleShowPassword}
                    edge="end"
                    style={{ color: "gray" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Tooltip>
        <Button
          type="submit"
          variant="contained"
          sx={{
            textTransform: "capitalize",
            backgroundColor: "#ee6c4d",
            width: "150px",
            letterSpacing: " 0.5px",
            margin: "10px 0px",
            cursor: " pointer",
            border: "1px solid transparent",
            borderRadius: "8px",
          }}
        >
          Sign Up
        </Button>
        {/* Continue with Google button */}
        <Stack
          display="flex"
          alignItems="center"
          justifyContent="center"
          direction="row"
          sx={{ mb: 1 }}
        >
          <div
            style={{
              border: "1px solid rgba(34, 60, 84, 0.397)",
              width: 150,
              margin: 10,
            }}
          ></div>
          <span style={{ color: "#293241", fontWeight: "bold" }}> OR </span>
          <div
            style={{
              border: "1px solid rgba(34, 60, 84, 0.397)",
              width: 150,
              margin: 10,
            }}
          ></div>
        </Stack>
        <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
      </form>
      {/* end of sign up form  */}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Account created successfully
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default Signup;
