import axios from "axios";
import { useAuth } from "../context/AuthContext";
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
  HomeRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CAROUSEL_ITEMS = [
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
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200&auto=format&fit=crop",
    title: "Unconditional love is",
    highlight: "waiting for you.",
    subtitle:
      "Discover the joy of rescuing a pet. Your new best friend is just a few clicks away.",
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

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  async function handleLogin() {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        { email, password },
      );

      // 1. Log the user into your AuthContext
      login(res.data);

      // 2. REDIRECT LOGIC: This tells the browser where to go!
      console.log("Full Backend Response:", res.data);
      // This checks if 'admin' appears anywhere in the role string, case-insensitive
      const userRole =
        res.data.role || (res.data.user && res.data.user.role) || "";

      if (userRole.toString().toUpperCase().includes("ADMIN")) {
        console.log("Redirecting to Admin...");
        navigate("/admin");
      } else {
        console.log("Redirecting to Home...");
        navigate("/");
      }
    } catch (err) {
      setError("Invalid email or password.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", bgcolor: "#ffffff" }}>
      {/* Carousel Section */}
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
              transitionProperty: "opacity, transform",
              transitionDuration: "1.5s, 6s",
              transitionTimingFunction: "ease-in-out, ease-out",
              transform: index === activeIndex ? "scale(1)" : "scale(1.05)",
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

        {/* Logo */}
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
              bgcolor: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
              display: "flex",
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
            PET{" "}
            <Box
              component="span"
              sx={{ color: "primary.light", fontWeight: 600 }}
            >
              STORE
            </Box>
          </Typography>
        </Box>

        {/* Carousel Text */}
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
                  {item.title}
                  <br />
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

        {/* Controls */}
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
            bgcolor: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.25)",
              transform: "scale(1.05)",
            },
          }}
        >
          <HomeRounded />
        </IconButton>
      </Box>

      {/* Form Section */}
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
          sx={{ width: "100%", maxWidth: 400, position: "relative", zIndex: 1 }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, color: "text.primary", mb: 1 }}
            >
              Welcome back
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", fontWeight: 500 }}
            >
              Please enter your details to sign in.
            </Typography>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{ mb: 2.5, borderRadius: "12px", fontSize: "0.875rem" }}
            >
              {error}
            </Alert>
          )}

          <Stack spacing={2.5}>
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
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 0.75,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  Password
                </Typography>
                <Link
                  href="#"
                  underline="hover"
                  sx={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "primary.main",
                  }}
                >
                  Forgot password?
                </Link>
              </Box>
              <TextField
                fullWidth
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
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

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleLogin}
              disabled={loading}
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
              {loading ? "Signing in..." : "Sign In"}
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
              Or continue with
            </Divider>

            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={() => {
                setEmail("admin@petstore.com");
                setPassword("admin123");
              }}
              sx={{
                borderRadius: "12px",
                py: 1.5,
                mt: 2,
                fontWeight: 700,
                textTransform: "none",
                color: "#1A1A1A",
                borderColor: "#E5E7EB",
                "&:hover": { borderColor: "#1A1A1A", bgcolor: "#F9FAFB" },
              }}
            >
              🎓 Auto-Fill Professor Login
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
            Don't have an account?{" "}
            <Link
              component="button"
              onClick={() => navigate("/register")}
              underline="hover"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                fontSize: "0.875rem",
              }}
            >
              Create one for free
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
