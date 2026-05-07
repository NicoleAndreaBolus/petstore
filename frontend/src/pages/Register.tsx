import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Link,
  InputAdornment,
  IconButton,
  Divider,
  Fade,
  Alert,
} from "@mui/material";
import {
  Pets,
  Visibility,
  VisibilityOff,
  Google,
  EmailOutlined,
  LockOutlined,
  PersonOutlined,
  HomeRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the Auth Context

const CAROUSEL_ITEMS = [
  {
    image:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200&auto=format&fit=crop",
    title: "Unconditional love is",
    highlight: "waiting for you.",
    subtitle:
      "Discover the joy of rescuing a pet. Your new best friend is just a few clicks away.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=1200&auto=format&fit=crop",
    title: "Every pet deserves a",
    highlight: "forever home.",
    subtitle:
      "Join thousands of families who found their perfect companion and start your adoption journey today.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1200&auto=format&fit=crop",
    title: "Give them a second",
    highlight: "chance at life.",
    subtitle:
      "Open your heart and home. Adopt a rescue pet and change two lives forever.",
  },
];

const premiumInputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    bgcolor: "#F3F4F6",
    transition: "all 0.2s ease-in-out",
    "& fieldset": { borderColor: "transparent", borderWidth: "2px" },
    "&:hover fieldset": { borderColor: "rgba(25, 118, 210, 0.3)" },
    "&.Mui-focused": {
      bgcolor: "#FFFFFF",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    },
    "&.Mui-focused fieldset": { borderColor: "primary.main" },
  },
};

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth(); // To automatically log the user in after registering

  // --- STATE FOR THE FORM ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // --- REGISTRATION LOGIC ---
  const handleRegister = async () => {
    setError(""); // Clear previous errors
    setIsLoading(true);

    try {
      // Fixed: Using the backticks and environment variable
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        // Success! The backend returns the user details and JWT token
        // Use your context to log them in
        login({ email: data.email, token: data.token, role: data.role });

        // Redirect to homepage
        navigate("/");
      } else {
        // Show error from backend (e.g., "Email already in use")
        setError(data.error || "Failed to register. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", bgcolor: "#ffffff" }}>
      {/* Left — Visual/Brand Side (No changes here) */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: { md: "50%", lg: "55%" },
          position: "relative",
          overflow: "hidden",
          bgcolor: "#000",
        }}
      >
        {CAROUSEL_ITEMS.map((item, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              inset: 0,
              opacity: index === activeIndex ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
              transform: index === activeIndex ? "scale(1)" : "scale(1.05)",
              transitionProperty: "opacity, transform",
              transitionDuration: "1.5s, 6s",
              transitionTimingFunction: "ease-in-out, ease-out",
            }}
          >
            <img
              src={item.image}
              alt="Pet"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        ))}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)",
          }}
        />

        <Box
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            top: 40,
            left: 48,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            zIndex: 10,
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              p: 1,
              bgcolor: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
              display: "flex",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <Pets sx={{ color: "#fff", fontSize: 24 }} />
          </Box>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 800,
              fontSize: "1.25rem",
              letterSpacing: 0.5,
            }}
          >
            PET
            <Box
              component="span"
              sx={{ color: "primary.light", fontWeight: 600 }}
            >
              STORE
            </Box>
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 80,
            left: 48,
            right: 48,
            maxWidth: 500,
            zIndex: 10,
          }}
        >
          {CAROUSEL_ITEMS.map((item, index) => (
            <Fade in={index === activeIndex} timeout={1000} key={index}>
              <Box
                sx={{ position: "absolute", bottom: 0, left: 0, width: "100%" }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: "#fff",
                    fontWeight: 800,
                    lineHeight: 1.2,
                    mb: 2,
                  }}
                >
                  {item.title} <br />
                  <Box component="span" sx={{ color: "primary.light" }}>
                    {item.highlight}
                  </Box>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "1.1rem",
                    lineHeight: 1.6,
                  }}
                >
                  {item.subtitle}
                </Typography>
              </Box>
            </Fade>
          ))}
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            left: 48,
            display: "flex",
            gap: 1,
            zIndex: 10,
            alignItems: "center",
          }}
        >
          {CAROUSEL_ITEMS.map((_, index) => (
            <Box
              key={index}
              onClick={() => setActiveIndex(index)}
              sx={{
                width: index === activeIndex ? 24 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor:
                  index === activeIndex
                    ? "primary.light"
                    : "rgba(255,255,255,0.4)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </Box>

        <IconButton
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            bottom: 40,
            right: 48,
            zIndex: 10,
            bgcolor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            color: "#fff",
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.25)",
              transform: "scale(1.05)",
            },
          }}
        >
          <HomeRounded />
        </IconButton>
      </Box>

      {/* Right — Interactive Form Side */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          px: { xs: 3, sm: 6, md: 8, lg: 12 },
          py: 6,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            display: { xs: "none", sm: "block" },
            color: "#1976D2",
            zIndex: 0,
            "@keyframes pawFade": {
              "0%": { opacity: 0 },
              "15%": { opacity: 0.12 },
              "50%": { opacity: 0.12 },
              "100%": { opacity: 0 },
            },
          }}
        >
          <Pets
            sx={{
              fontSize: 56,
              position: "absolute",
              bottom: "10%",
              left: "15%",
              transform: "rotate(35deg)",
              opacity: 0,
              animation: "pawFade 6s infinite 0s",
            }}
          />
          <Pets
            sx={{
              fontSize: 56,
              position: "absolute",
              bottom: "25%",
              left: "28%",
              transform: "rotate(45deg)",
              opacity: 0,
              animation: "pawFade 6s infinite 0.6s",
            }}
          />
          <Pets
            sx={{
              fontSize: 56,
              position: "absolute",
              bottom: "45%",
              left: "20%",
              transform: "rotate(25deg)",
              opacity: 0,
              animation: "pawFade 6s infinite 1.2s",
            }}
          />
          <Pets
            sx={{
              fontSize: 56,
              position: "absolute",
              bottom: "60%",
              left: "40%",
              transform: "rotate(50deg)",
              opacity: 0,
              animation: "pawFade 6s infinite 1.8s",
            }}
          />
        </Box>

        <Box
          sx={{ width: "100%", maxWidth: 400, position: "relative", zIndex: 1 }}
        >
          <Box
            onClick={() => navigate("/")}
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              gap: 1.5,
              mb: 4,
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                p: 1,
                bgcolor: "primary.main",
                borderRadius: "12px",
                display: "flex",
              }}
            >
              <Pets sx={{ color: "#fff", fontSize: 24 }} />
            </Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.25rem",
                letterSpacing: 0.5,
                color: "text.primary",
              }}
            >
              PET
              <Box
                component="span"
                sx={{ color: "primary.main", fontWeight: 600 }}
              >
                STORE
              </Box>
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, color: "text.primary", mb: 1 }}
            >
              Create an account
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", fontWeight: 500 }}
            >
              Start your adoption journey today.
            </Typography>
          </Box>

          {/* Show error message if registration fails */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Stack spacing={2.5}>
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: "text.primary", mb: 0.75 }}
              >
                Full Name
              </Typography>
              <TextField
                fullWidth
                placeholder="John Doe"
                type="text"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)} // Bind state
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlined sx={{ color: "text.disabled" }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={premiumInputStyle}
              />
            </Box>

            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: "text.primary", mb: 0.75 }}
              >
                Email Address
              </Typography>
              <TextField
                fullWidth
                placeholder="you@example.com"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Bind state
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined sx={{ color: "text.disabled" }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={premiumInputStyle}
              />
            </Box>

            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: "text.primary", mb: 0.75 }}
              >
                Password
              </Typography>
              <TextField
                fullWidth
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Bind state
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined sx={{ color: "text.disabled" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: "text.disabled" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={premiumInputStyle}
              />
            </Box>

            {/* Hooked up onClick to our handleRegister function */}
            <Button
              onClick={handleRegister}
              disabled={isLoading}
              variant="contained"
              fullWidth
              size="large"
              sx={{
                borderRadius: "12px",
                py: 1.5,
                mt: 1,
                fontWeight: 700,
                fontSize: "1rem",
                textTransform: "none",
                background: "linear-gradient(135deg, #1976D2 0%, #115293 100%)",
                boxShadow: "0 8px 24px rgba(25, 118, 210, 0.25)",
                transition: "all 0.2s",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 28px rgba(25, 118, 210, 0.3)",
                },
              }}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <Divider
              sx={{
                my: 1,
                color: "text.disabled",
                fontSize: "0.875rem",
                fontWeight: 500,
                "&::before, &::after": { borderColor: "#E5E7EB" },
              }}
            >
              Or sign up with
            </Divider>

            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<Google sx={{ color: "#DB4437" }} />}
              sx={{
                borderRadius: "12px",
                py: 1.5,
                fontWeight: 600,
                fontSize: "1rem",
                textTransform: "none",
                bgcolor: "#F3F4F6",
                color: "text.primary",
                boxShadow: "none",
                border: "1px solid transparent",
                "&:hover": {
                  bgcolor: "#E5E7EB",
                  boxShadow: "none",
                  borderColor: "#D1D5DB",
                },
              }}
            >
              Sign up with Google
            </Button>
          </Stack>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mt: 4,
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            Already have an account?{" "}
            <Link
              component="button"
              onClick={() => navigate("/login")}
              underline="hover"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                fontSize: "0.875rem",
              }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
