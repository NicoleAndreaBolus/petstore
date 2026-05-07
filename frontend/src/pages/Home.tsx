import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Box,
  AppBar,
  Toolbar,
  InputAdornment,
  Button,
  Stack,
  Link,
  IconButton,
  Badge,
  Dialog,
  DialogContent,
  Fade,
  Chip,
  Avatar,
  AvatarGroup,
} from "@mui/material";
import {
  SearchRounded,
  PetsRounded,
  FavoriteRounded,
  VerifiedUserRounded,
  CloseRounded,
  ArrowForwardRounded,
  StarRounded,
  LocalHospitalRounded,
} from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, logout } = useAuth();
  const [pets, setPets] = useState<any[]>([]);
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();
  const [selectedPet, setSelectedPet] = useState<any | null>(null);
  const { addToCart } = useCart();

  const navigate = useNavigate();

  useEffect(function () {
    // Use backticks and the variable here
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/pets`)
      .then(function (res) {
        setPets(res.data);
      })
      .catch(function (err) {
        console.error("Error:", err);
      });
  }, []);

  const filteredPets = pets.filter(function (pet) {
    const matchesSearch =
      pet.species.toLowerCase().includes(filter.toLowerCase()) ||
      pet.name.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory =
      category === "All" ||
      pet.species.toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  function scrollToGallery() {
    const yOffset = -100;
    const element = document.getElementById("gallery-section");
    if (element) {
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  function handleFilterChange(e: any) {
    setFilter(e.target.value);
  }

  function handleCategoryClick(cat: string) {
    setCategory(cat);
  }

  function handleOpenCart() {
    setIsCartOpen(true);
  }

  function handleCloseCart() {
    setIsCartOpen(false);
  }

  function handleOpenPassport(pet: any) {
    setSelectedPet(pet);
  }

  function handleClosePassport() {
    setSelectedPet(null);
  }

  function navigateToLogin() {
    navigate("/login");
  }

  function navigateToGallery() {
    navigate("/gallery");
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#FAFAFA",
        overflowX: "hidden",
      }}
    >
      {/* Premium Glassmorphic Navbar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}
          >
            <Box
              onClick={scrollToTop}
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  p: 1,
                  bgcolor: "primary.main",
                  borderRadius: "12px",
                  display: "flex",
                  boxShadow: "0 4px 12px rgba(63, 81, 181, 0.2)",
                }}
              >
                <PetsRounded sx={{ color: "#fff", fontSize: 24 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 900, color: "#1A1A1A", letterSpacing: -0.5 }}
              >
                PET
                <Box component="span" sx={{ color: "primary.main" }}>
                  STORE
                </Box>
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, md: 3 },
              }}
            >
              <Typography
                onClick={navigateToGallery}
                sx={{
                  fontWeight: 800,
                  color: "#1A1A1A",
                  cursor: "pointer",
                  display: { xs: "none", sm: "block" },
                  "&:hover": { color: "primary.main" },
                }}
              >
                Gallery
              </Typography>

              <IconButton
                onClick={handleOpenCart}
                sx={{
                  color: "#1A1A1A",
                  transition: "all 0.2s",
                  "&:hover": { color: "primary.main", transform: "scale(1.1)" },
                }}
              >
                <Badge
                  badgeContent={cartItems.length}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontWeight: 700,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <FavoriteRounded />
                </Badge>
              </IconButton>
              {/* Replace your old "Sign In" button with this: */}
              {user ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {/* ── NEW: ADMIN DASHBOARD BUTTON ── */}
                  {(user.email === "admin@petstore.com" ||
                    user.role === "ADMIN") && (
                    <Button
                      variant="contained"
                      onClick={() => navigate("/admin")}
                      sx={{
                        borderRadius: "12px",
                        fontWeight: 700,
                        textTransform: "none",
                        bgcolor: "#1E293B",
                        "&:hover": { bgcolor: "#0F172A" },
                        display: { xs: "none", sm: "flex" },
                      }}
                    >
                      Admin Dashboard
                    </Button>
                  )}

                  <Chip
                    avatar={
                      <Avatar sx={{ bgcolor: "primary.main", color: "#fff" }}>
                        {user.email[0].toUpperCase()}
                      </Avatar>
                    }
                    label={user.email.split("@")[0]}
                    sx={{
                      fontWeight: 700,
                      bgcolor: "#F3F4F6",
                      display: { xs: "none", sm: "flex" },
                    }}
                  />
                  <Button
                    variant="text"
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    sx={{
                      color: "error.main",
                      fontWeight: 700,
                      textTransform: "none",
                    }}
                  >
                    Logout
                  </Button>
                </Box>
              ) : (
                <Button
                  variant="outlined"
                  onClick={navigateToLogin}
                  sx={{
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 700,
                    px: 3,
                    py: 1,
                    borderColor: "rgba(0,0,0,0.1)",
                    color: "#1A1A1A",
                    "&:hover": {
                      borderColor: "#1A1A1A",
                      bgcolor: "transparent",
                    },
                  }}
                >
                  Sign In
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Modern Split Hero Section */}
      <Box
        sx={{
          pt: { xs: 16, md: 16 },
          pb: { xs: 12, md: 12 },
          minHeight: { md: "90vh" },
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(63,81,181,0.08) 0%, rgba(250,250,250,0) 70%)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid
            container
            spacing={{ xs: 4, md: 4, lg: 8 }}
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Left Content - Flush Left */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{ maxWidth: 540, textAlign: { xs: "center", md: "left" } }}
              >
                <Chip
                  label="Join 10,000+ Happy Families"
                  icon={<StarRounded sx={{ color: "#FFB400 !important" }} />}
                  sx={{
                    mb: 3,
                    fontWeight: 700,
                    bgcolor: "#FFF",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    px: 1,
                    py: 2.5,
                    borderRadius: "100px",
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900,
                    color: "#1A1A1A",
                    mb: 3,
                    fontSize: { xs: "3rem", md: "3.5rem", lg: "4.5rem" },
                    letterSpacing: -2,
                    lineHeight: 1.1,
                  }}
                >
                  Unconditional love, <br />
                  <Box
                    component="span"
                    sx={{ color: "primary.main", position: "relative" }}
                  >
                    delivered.
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 4,
                        left: 0,
                        width: "100%",
                        height: "30%",
                        bgcolor: "primary.light",
                        opacity: 0.3,
                        zIndex: -1,
                        borderRadius: 1,
                      }}
                    />
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "text.secondary",
                    mb: 4,
                    fontWeight: 400,
                    lineHeight: 1.6,
                    fontSize: { md: "1.15rem" },
                  }}
                >
                  Browse our curated collection of healthy, happy, and
                  vet-checked companions ready to join your family today.
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    gap: 2,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={scrollToGallery}
                    endIcon={<ArrowForwardRounded />}
                    sx={{
                      borderRadius: "14px",
                      px: 4,
                      py: 1.6,
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      textTransform: "none",
                      background:
                        "linear-gradient(135deg, #1976D2 0%, #115293 100%)",
                      boxShadow: "0 8px 24px rgba(25, 118, 210, 0.3)",
                      transition: "all 0.2s",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 28px rgba(25, 118, 210, 0.4)",
                      },
                    }}
                  >
                    Meet the Pets
                  </Button>
                  <Button
                    variant="text"
                    size="large"
                    sx={{
                      borderRadius: "14px",
                      px: 4,
                      py: 1.6,
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      textTransform: "none",
                      color: "text.primary",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                    }}
                  >
                    How it works
                  </Button>
                </Box>
              </Box>
            </Grid>

            {/* Right Hero Image - Flush Right */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 500,
                  ml: "auto",
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&auto=format&fit=crop"
                  alt="Happy dog looking up"
                  sx={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                    borderRadius: "32px",
                    boxShadow: "0 24px 48px rgba(0,0,0,0.12)",
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    bottom: -24,
                    left: -24,
                    bgcolor: "#FFF",
                    p: 2,
                    borderRadius: "20px",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    zIndex: 2,
                  }}
                >
                  <AvatarGroup
                    max={3}
                    sx={{
                      "& .MuiAvatar-root": {
                        width: 36,
                        height: 36,
                        border: "2px solid #fff",
                      },
                    }}
                  >
                    <Avatar
                      alt="User 1"
                      src="https://i.pravatar.cc/150?img=1"
                    />
                    <Avatar
                      alt="User 2"
                      src="https://i.pravatar.cc/150?img=2"
                    />
                    <Avatar
                      alt="User 3"
                      src="https://i.pravatar.cc/150?img=3"
                    />
                  </AvatarGroup>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 800, lineHeight: 1.2 }}
                    >
                      Trusted by
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                      }}
                    >
                      10k+ Adopters
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats/Value Props */}
      <Container
        maxWidth="lg"
        sx={{ mt: { xs: 4, md: 4 }, mb: 10, position: "relative", zIndex: 2 }}
      >
        <Grid
          container
          spacing={3}
          alignItems="stretch"
          justifyContent="center"
        >
          {[
            {
              icon: <FavoriteRounded sx={{ fontSize: 32, color: "#E91E63" }} />,
              title: "Ethically Sourced",
              desc: "Certified, loving breeders only.",
            },
            {
              icon: (
                <VerifiedUserRounded sx={{ fontSize: 32, color: "#1976D2" }} />
              ),
              title: "Vet Verified",
              desc: "Rigorous 40-point health check.",
            },
            {
              icon: (
                <LocalHospitalRounded sx={{ fontSize: 32, color: "#009688" }} />
              ),
              title: "Lifetime Support",
              desc: "Free behavioral consultations.",
            },
          ].map(function (item, index) {
            return (
              <Grid key={index} item xs={12} sm={4}>
                <Card
                  sx={{
                    height: "100%",
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    borderRadius: "20px",
                    bgcolor: "#FFF",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                    border: "1px solid rgba(0,0,0,0.05)",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "rgba(0,0,0,0.03)",
                      borderRadius: "16px",
                      display: "flex",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: "#1A1A1A",
                        fontSize: "1.1rem",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mt: 0.5 }}
                    >
                      {item.desc}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Gallery Section */}
      <Box
        id="gallery-section"
        sx={{
          bgcolor: "#FFF",
          py: 12,
          borderTop: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              mb: 6,
              gap: 3,
            }}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  color: "#1A1A1A",
                  letterSpacing: -1,
                  mb: 1,
                }}
              >
                Available Companions
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Find your perfect match from our verified network.
              </Typography>
            </Box>

            <TextField
              placeholder="Search breeds or names..."
              variant="outlined"
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: { xs: "100%", md: "400px" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "100px",
                  bgcolor: "#F3F4F6",
                  transition: "all 0.2s",
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "rgba(0,0,0,0.1)" },
                  "&.Mui-focused": {
                    bgcolor: "#FFF",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                    borderWidth: "2px",
                  },
                },
              }}
            />
          </Box>

          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              mb: 5,
              overflowX: "auto",
              pb: 1,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {["All", "Dog", "Cat", "Bird", "Rabbit"].map(function (cat) {
              return (
                <Chip
                  key={cat}
                  label={cat}
                  onClick={function () {
                    handleCategoryClick(cat);
                  }}
                  sx={{
                    fontWeight: 800,
                    px: 2,
                    py: 2.5,
                    borderRadius: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    bgcolor: category === cat ? "primary.main" : "#F3F4F6",
                    color: category === cat ? "#FFF" : "text.secondary",
                    "&:hover": {
                      bgcolor: category === cat ? "primary.dark" : "#E5E7EB",
                      transform: "translateY(-2px)",
                    },
                  }}
                />
              );
            })}
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 4,
            }}
          >
            {/* Added .slice(0, 4) to ONLY show 4 preview pets! */}
            {filteredPets.slice(0, 4).map(function (pet) {
              return (
                <Card
                  key={pet.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "24px",
                    overflow: "hidden",
                    bgcolor: "#FFF",
                    border: "1px solid #F0F0F0",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                      borderColor: "primary.main",
                    },
                  }}
                  onClick={function () {
                    handleOpenPassport(pet);
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      aspectRatio: "1/1",
                      position: "relative",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={pet.imageUrl}
                      alt={pet.name}
                      sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>

                  <CardContent
                    sx={{
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 800, color: "#1A1A1A" }}
                        >
                          {pet.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "primary.main",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                          }}
                        >
                          {pet.species}
                        </Typography>
                      </Box>
                      <Chip
                        label={pet.age || "Young"}
                        size="small"
                        sx={{ fontWeight: 700, bgcolor: "#F3F4F6" }}
                      />
                    </Box>

                    <Box sx={{ mt: "auto", pt: 2 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        disableElevation
                        onClick={function (e) {
                          e.stopPropagation();
                          handleOpenPassport(pet);
                        }}
                        sx={{
                          borderRadius: "12px",
                          textTransform: "none",
                          fontWeight: 700,
                          py: 1.2,
                          bgcolor: "#F3F4F6",
                          color: "#1A1A1A",
                          "&:hover": {
                            bgcolor: "primary.main",
                            color: "#FFF",
                          },
                        }}
                      >
                        Meet {pet.name}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>

          {/* "Meet More Pets" Call to Action Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Button
              variant="contained"
              size="large"
              // CHECK USER: If signed in go to gallery, else go to login
              onClick={() => (user ? navigate("/gallery") : navigate("/login"))}
              endIcon={<ArrowForwardRounded />}
              sx={{
                borderRadius: "50px",
                px: 6,
                py: 2,
                fontWeight: 800,
                fontSize: "1.1rem",
                bgcolor: "#1A1A1A",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                "&:hover": {
                  bgcolor: "primary.main",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.2s",
              }}
            >
              Meet More Pets
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Premium Passport Dialog */}
      <Dialog
        open={Boolean(selectedPet)}
        onClose={handleClosePassport}
        TransitionComponent={Fade}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "24px",
            overflow: "hidden",
            m: 2,
            bgcolor: "#F8FAFC",
            border: "1px solid #E2E8F0",
          },
        }}
      >
        {selectedPet && (
          <DialogContent sx={{ p: 0 }}>
            {/* Passport Header Strip */}
            <Box
              sx={{
                bgcolor: "#0F172A",
                color: "white",
                py: 1.5,
                px: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="overline"
                sx={{ fontWeight: 800, letterSpacing: 2, fontSize: "0.8rem" }}
              >
                OFFICIAL COMPANION PASSPORT
              </Typography>
              <Typography
                variant="overline"
                sx={{ opacity: 0.7, letterSpacing: 2, fontSize: "0.7rem" }}
              >
                ID: {selectedPet.id || "#8492-B"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                position: "relative",
              }}
            >
              {/* Left Side - Passport Photo Area */}
              <Box
                sx={{
                  width: { xs: "100%", md: "45%" },
                  p: { xs: 3, md: 5 },
                  bgcolor: "rgba(255,255,255,0.5)",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: "3/4",
                    bgcolor: "white",
                    p: 1.5,
                    pb: 4,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    transform: "rotate(-2deg)",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "rotate(0deg)" },
                  }}
                >
                  <img
                    src={selectedPet.imageUrl}
                    alt={selectedPet.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Box>

              {/* Right Side - Passport Details */}
              <Box
                sx={{
                  width: { xs: "100%", md: "55%" },
                  p: { xs: 3, md: 5 },
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <IconButton
                  onClick={handleClosePassport}
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    bgcolor: "white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <CloseRounded />
                </IconButton>

                {/* "Rubber Stamp" effect */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 40,
                    right: 60,
                    border: "3px solid #10B981",
                    color: "#10B981",
                    px: 2,
                    py: 0.5,
                    borderRadius: "8px",
                    transform: "rotate(15deg)",
                    opacity: 0.8,
                    pointerEvents: "none",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      fontSize: "0.9rem",
                    }}
                  >
                    VET CLEARED ✓
                  </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 700,
                      letterSpacing: 1,
                    }}
                  >
                    GIVEN NAME
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 900,
                      mb: 1,
                      color: "#0F172A",
                      fontFamily: "serif",
                    }}
                  >
                    {selectedPet.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "primary.main",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      mb: 4,
                    }}
                  >
                    {selectedPet.breed || selectedPet.species}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mb: 4,
                  }}
                >
                  {[
                    {
                      label: "ESTIMATED AGE",
                      value: selectedPet.age || "2 Years",
                    },
                    { label: "SEX", value: selectedPet.gender || "Male" },
                    {
                      label: "BUILD / SIZE",
                      value: selectedPet.size || "Medium",
                    },
                  ].map(function (detail) {
                    return (
                      <Box
                        key={detail.label}
                        sx={{
                          display: "flex",
                          borderBottom: "1px dashed #CBD5E1",
                          pb: 1,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            width: "120px",
                            color: "text.secondary",
                            fontWeight: 700,
                            mt: 0.5,
                          }}
                        >
                          {detail.label}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 700,
                            color: "#0F172A",
                            flexGrow: 1,
                          }}
                        >
                          {detail.value}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>

                <Box sx={{ flexGrow: 1, mb: 4 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 700,
                      letterSpacing: 1,
                      display: "block",
                      mb: 1,
                    }}
                  >
                    NOTES
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#475569",
                      lineHeight: 1.8,
                      fontStyle: "italic",
                    }}
                  >
                    "
                    {selectedPet.description ||
                      `${selectedPet.name} is a healthy and playful ${selectedPet.species} ready for integration into a new loving home.`}
                    "
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  // 1. Disable the button if the user is the Admin
                  disabled={
                    user?.email === "admin@petstore.com" ||
                    user?.role === "ADMIN"
                  }
                  onClick={() => {
                    if (user) {
                      // Add pet to cart, close modal, open drawer
                      addToCart(selectedPet);
                      handleClosePassport();
                      setIsCartOpen(true);
                    } else {
                      // Not logged in -> Send to login
                      handleClosePassport();
                      navigate("/login");
                    }
                  }}
                  sx={{
                    borderRadius: "12px",
                    py: 2,
                    px: 4,
                    fontWeight: 800,
                    textTransform: "none",
                    fontSize: "1.05rem",

                    // 2. Gray out the button colors if they are an Admin
                    bgcolor:
                      user?.email === "admin@petstore.com" ||
                      user?.role === "ADMIN"
                        ? "#E2E8F0"
                        : "#0F172A",
                    color:
                      user?.email === "admin@petstore.com" ||
                      user?.role === "ADMIN"
                        ? "#94A3B8"
                        : "white",
                    boxShadow:
                      user?.email === "admin@petstore.com" ||
                      user?.role === "ADMIN"
                        ? "none"
                        : "0 8px 24px rgba(15, 23, 42, 0.2)",
                    "&:hover": {
                      bgcolor:
                        user?.email === "admin@petstore.com" ||
                        user?.role === "ADMIN"
                          ? "#E2E8F0"
                          : "#1E293B",
                      transform:
                        user?.email === "admin@petstore.com" ||
                        user?.role === "ADMIN"
                          ? "none"
                          : "translateY(-2px)",
                    },
                  }}
                >
                  {/* 3. Show a custom message to the Admin! */}
                  {user?.email === "admin@petstore.com" ||
                  user?.role === "ADMIN"
                    ? "Admins manage pets in Dashboard 📋"
                    : user
                      ? `Adopt ${selectedPet?.name} 🐾`
                      : `Sign in to Adopt ${selectedPet?.name} 🐾`}
                </Button>
              </Box>
            </Box>
          </DialogContent>
        )}
      </Dialog>

      {/* Minimal Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: "#0A0A0A",
          color: "white",
          py: { xs: 8, md: 10 },
          mt: "auto",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} justifyContent="space-between">
            <Grid item xs={12} md={4}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
              >
                <Box
                  sx={{
                    p: 1,
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    display: "flex",
                  }}
                >
                  <PetsRounded sx={{ color: "#fff", fontSize: 24 }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 900, letterSpacing: -0.5 }}
                >
                  PETSTORE
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "#888", lineHeight: 1.8, mb: 4, maxWidth: 400 }}
              >
                Dedicated to connecting loving families with healthy, happy
                companions. Every pet deserves a forever home.
              </Typography>
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  color: "#FFF",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Explore
              </Typography>
              <Stack spacing={2}>
                {[
                  "Available Pets",
                  "Success Stories",
                  "About Us",
                  "Contact",
                ].map(function (item) {
                  return (
                    <Link
                      key={item}
                      href="#"
                      underline="none"
                      sx={{
                        color: "#888",
                        fontSize: "0.95rem",
                        "&:hover": { color: "#FFF" },
                        transition: "color 0.2s",
                      }}
                    >
                      {item}
                    </Link>
                  );
                })}
              </Stack>
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  color: "#FFF",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Support
              </Typography>
              <Stack spacing={2}>
                {[
                  "Adoption FAQ",
                  "Pet Care Tips",
                  "Partners",
                  "Terms of Service",
                ].map(function (item) {
                  return (
                    <Link
                      key={item}
                      href="#"
                      underline="none"
                      sx={{
                        color: "#888",
                        fontSize: "0.95rem",
                        "&:hover": { color: "#FFF" },
                        transition: "color 0.2s",
                      }}
                    >
                      {item}
                    </Link>
                  );
                })}
              </Stack>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  color: "#FFF",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Newsletter
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#888", mb: 3, lineHeight: 1.6 }}
              >
                Get adoption updates and care tips directly to your inbox.
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  placeholder="Email address"
                  size="small"
                  sx={{
                    flexGrow: 1,
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "rgba(255,255,255,0.05)",
                      borderRadius: "12px",
                      color: "#FFF",
                      "& fieldset": { borderColor: "transparent" },
                      "&.Mui-focused fieldset": { borderColor: "primary.main" },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "12px",
                    px: 3,
                    fontWeight: 700,
                    textTransform: "none",
                    bgcolor: "primary.main",
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              borderTop: "1px solid rgba(255,255,255,0.1)",
              mt: 8,
              pt: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: "#666" }}>
              &copy; {new Date().getFullYear()} PetStore Inc. All rights
              reserved.
            </Typography>
          </Box>
        </Container>
      </Box>

      <CartDrawer open={isCartOpen} onClose={handleCloseCart} />
    </Box>
  );
}
