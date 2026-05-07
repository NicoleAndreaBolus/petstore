import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogContent,
  IconButton,
  Chip,
  Button,
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  CloseRounded,
  PetsRounded,
  ArrowBackRounded,
  SearchRounded,
  FavoriteRounded,
  FavoriteBorderRounded,
  VerifiedRounded,
  LocationOnRounded,
  CheckCircleRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/pets`;

const FILTERS = [
  { label: "All", emoji: "🐾" },
  { label: "Dog", emoji: "🐶" },
  { label: "Cat", emoji: "🐱" },
  { label: "Bird", emoji: "🐦" },
  { label: "Rabbit", emoji: "🐰" },
];

export default function Gallery() {
  const [pets, setPets] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedPet, setSelectedPet] = useState<any>(null);


  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [adopted, setAdopted] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setPets(res.data))
      .catch(console.error);
  }, []);

  function handleCloseModal() {
    setSelectedPet(null);

    // Add a tiny delay so the text doesn't change while the modal is fading out
    setTimeout(() => setAdopted(false), 300);
  }
  const handleAdopt = () => {
    if (!user) {
      setSelectedPet(null);
      navigate("/login");
      return;
    }
    addToCart(selectedPet);
    setAdopted(true);
  };

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const displayedPets = pets.filter((pet) => {
    const matchesFilter =
      activeFilter === "All" || pet.species === activeFilter;
    const matchesSearch =
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      (pet.species || "").toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F8F9FC" }}>
      {/* Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid #EAECF0",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ justifyContent: "space-between", py: 1 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              <Box
                sx={{
                  bgcolor: "#3f51b5",
                  borderRadius: "12px",
                  p: 0.8,
                  display: "flex",
                }}
              >
                <PetsRounded sx={{ color: "#fff", fontSize: 22 }} />
              </Box>
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  color: "#1A1A1A",
                  letterSpacing: -0.5,
                }}
              >
                PET
                <Box component="span" sx={{ color: "#3f51b5" }}>
                  STORE
                </Box>
              </Typography>
            </Box>

            <TextField
              placeholder="Search by name or species..."
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded sx={{ color: "#94A3B8", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                width: { xs: 0, md: "360px" },
                display: { xs: "none", md: "flex" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  bgcolor: "#F1F5F9",
                  "& fieldset": { border: "none" },
                  "&.Mui-focused fieldset": { border: "1px solid #3f51b5" },
                },
              }}
            />

            {/* Inside the Toolbar in Gallery.tsx */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* ── NEW: ADMIN DASHBOARD BUTTON ── */}
              {user &&
                (user.email === "admin@petstore.com" ||
                  user.role === "ADMIN") && (
                  <Button
                    variant="contained"
                    onClick={() => navigate("/admin")}
                    sx={{
                      borderRadius: "50px",
                      fontWeight: 700,
                      textTransform: "none",
                      bgcolor: "#1E293B",
                      "&:hover": { bgcolor: "#0F172A" },
                    }}
                  >
                    Admin Dashboard
                  </Button>
                )}

              <Button
                variant="outlined"
                startIcon={<ArrowBackRounded />}
                onClick={() => navigate("/")}
                sx={{
                  borderRadius: "50px",
                  textTransform: "none",
                  fontWeight: 700,
                  borderColor: "#E2E8F0",
                  color: "#64748B",
                  "&:hover": {
                    borderColor: "#3f51b5",
                    color: "#3f51b5",
                    bgcolor: "transparent",
                  },
                }}
              >
                Back to Home
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          pt: 10,
          pb: 12,
          px: 2,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {[
          { top: -60, left: -60, size: 300 },
          { top: 20, right: -80, size: 200 },
          { bottom: -80, left: "40%", size: 250 },
        ].map((blob, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              ...blob,
              width: blob.size,
              height: blob.size,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,0.06)",
              pointerEvents: "none",
            }}
          />
        ))}
        <Typography
          variant="overline"
          sx={{
            color: "rgba(255,255,255,0.7)",
            fontWeight: 800,
            letterSpacing: 3,
            fontSize: "0.8rem",
          }}
        >
          🐾 Our Full Collection
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            color: "#fff",
            letterSpacing: -2,
            mt: 1,
            mb: 2,
            fontSize: { xs: "2.5rem", md: "3.5rem" },
          }}
        >
          Find Your Perfect
          <Box
            component="span"
            sx={{ display: "block", color: "rgba(255,255,255,0.75)" }}
          >
            Companion
          </Box>
        </Typography>
        <Typography
          sx={{
            color: "rgba(255,255,255,0.7)",
            maxWidth: 500,
            mx: "auto",
            lineHeight: 1.7,
            mb: 5,
          }}
        >
          Every animal here is vet-checked, loved, and ready to join your
          family.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1.5,
            flexWrap: "wrap",
          }}
        >
          {FILTERS.map(({ label, emoji }) => {
            const isActive = activeFilter === label;
            return (
              <Button
                key={label}
                onClick={() => setActiveFilter(label)}
                sx={{
                  borderRadius: "50px",
                  px: 3,
                  py: 1,
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "0.95rem",
                  bgcolor: isActive ? "#fff" : "rgba(255,255,255,0.15)",
                  color: isActive ? "#3f51b5" : "#fff",
                  backdropFilter: "blur(10px)",
                  border: isActive ? "none" : "1px solid rgba(255,255,255,0.3)",
                  "&:hover": {
                    bgcolor: isActive ? "#fff" : "rgba(255,255,255,0.25)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                {emoji} {label}
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* Stats Bar */}
      <Box sx={{ bgcolor: "#fff", borderBottom: "1px solid #EAECF0", py: 2 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography
              sx={{ color: "#64748B", fontWeight: 600, fontSize: "0.9rem" }}
            >
              Showing{" "}
              <Box component="span" sx={{ color: "#1A1A1A", fontWeight: 900 }}>
                {displayedPets.length}
              </Box>{" "}
              companions
            </Typography>
            <Box sx={{ display: "flex", gap: 4 }}>
              {[
                { value: `${pets.length}+`, label: "Total Pets" },
                { value: "100%", label: "Vet Checked" },
                { value: "48hr", label: "Avg. Response" },
              ].map(({ value, label }) => (
                <Box key={label} sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      fontWeight: 900,
                      color: "#3f51b5",
                      fontSize: "1.1rem",
                    }}
                  >
                    {value}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#94A3B8",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Gallery Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
          }}
        >
          {displayedPets.map((pet) => (
            <Card
              key={pet.id}
              onClick={() => setSelectedPet(pet)}
              sx={{
                borderRadius: "24px",
                border: "1px solid #EAECF0",
                boxShadow: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                overflow: "hidden",
                position: "relative",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 24px 48px rgba(0,0,0,0.1)",
                  borderColor: "#3f51b5",
                },
              }}
            >
              <IconButton
                onClick={(e) => toggleFavorite(e, pet.id)}
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  zIndex: 2,
                  bgcolor: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(8px)",
                  "&:hover": { bgcolor: "#fff" },
                  p: 1,
                }}
              >
                {favorites.has(pet.id) ? (
                  <FavoriteRounded sx={{ color: "#EF4444", fontSize: 20 }} />
                ) : (
                  <FavoriteBorderRounded
                    sx={{ color: "#94A3B8", fontSize: 20 }}
                  />
                )}
              </IconButton>
              <Box
                sx={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  zIndex: 2,
                  bgcolor: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "50px",
                  px: 1.5,
                  py: 0.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <VerifiedRounded sx={{ color: "#3f51b5", fontSize: 14 }} />
                <Typography
                  sx={{ fontSize: "0.7rem", fontWeight: 800, color: "#3f51b5" }}
                >
                  Vet Verified
                </Typography>
              </Box>
              <CardMedia
                component="img"
                height="260"
                image={
                  pet.imageUrl ||
                  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800"
                }
                alt={pet.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 1,
                  }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 900,
                        color: "#1A1A1A",
                        letterSpacing: -0.5,
                      }}
                    >
                      {pet.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#64748B",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                      }}
                    >
                      {pet.breed || pet.species}
                    </Typography>
                  </Box>
                  <Chip
                    label={pet.species}
                    size="small"
                    sx={{
                      bgcolor: "#EEF2FF",
                      color: "#3f51b5",
                      fontWeight: 800,
                      fontSize: "0.7rem",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mb: 2,
                  }}
                >
                  <LocationOnRounded sx={{ fontSize: 14, color: "#94A3B8" }} />
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      color: "#94A3B8",
                      fontWeight: 600,
                    }}
                  >
                    Manila, PH
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {[
                    pet.age || "Young",
                    pet.gender || "Unknown",
                    pet.size || "Medium",
                  ].map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        bgcolor: "#F8FAFC",
                        color: "#475569",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        border: "1px solid #E2E8F0",
                        borderRadius: "8px",
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {displayedPets.length === 0 && (
          <Box sx={{ textAlign: "center", py: 16 }}>
            <Typography sx={{ fontSize: "4rem", mb: 2 }}>🐾</Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: 900, color: "#1A1A1A", mb: 1 }}
            >
              No companions found
            </Typography>
            <Typography sx={{ color: "#94A3B8" }}>
              Try adjusting your filters or search term.
            </Typography>
          </Box>
        )}
      </Container>

      {/* Pet Passport Modal */}
      <Dialog
        open={Boolean(selectedPet)}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "32px",
            overflow: "hidden",
            bgcolor: "#FFFFFF",
          },
        }}
      >
        {selectedPet && (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              minHeight: 500,
            }}
          >
            {/* Image Side */}
            <Box
              sx={{
                width: { xs: "100%", md: "48%" },
                position: "relative",
                minHeight: { xs: 280, md: "auto" },
              }}
            >
              <Box
                component="img"
                src={
                  selectedPet.imageUrl ||
                  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800"
                }
                alt={selectedPet.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  minHeight: { xs: 280, md: 500 },
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
                }}
              />
              <IconButton
                onClick={handleCloseModal}
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  bgcolor: "rgba(255,255,255,0.9)",
                  "&:hover": { bgcolor: "#fff" },
                }}
              >
                <CloseRounded />
              </IconButton>
              <Box sx={{ position: "absolute", bottom: 20, left: 20 }}>
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 900,
                    fontSize: "1.8rem",
                    letterSpacing: -1,
                  }}
                >
                  {selectedPet.name}
                </Typography>
                <Typography
                  sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}
                >
                  {selectedPet.breed || selectedPet.species}
                </Typography>
              </Box>
            </Box>

            {/* Info Side */}
            <DialogContent
              sx={{
                p: { xs: 4, md: 5 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* ── SUCCESS STATE ── */}
              {adopted ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    flexGrow: 1,
                    py: 4,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#ECFDF5",
                      borderRadius: "50%",
                      width: 80,
                      height: 80,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                    }}
                  >
                    <CheckCircleRounded
                      sx={{ fontSize: 48, color: "#10B981" }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 900, color: "#1A1A1A", mb: 1 }}
                  >
                    Request Submitted! 🐾
                  </Typography>
                  <Typography sx={{ color: "#64748B", lineHeight: 1.7, mb: 1 }}>
                    Your adoption request for
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 900,
                      color: "#3f51b5",
                      fontSize: "1.3rem",
                      mb: 2,
                    }}
                  >
                    {selectedPet.name}
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: "#F8FAFC",
                      borderRadius: "16px",
                      p: 3,
                      border: "1px solid #E2E8F0",
                      mb: 4,
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#475569",
                        lineHeight: 1.8,
                        fontSize: "0.9rem",
                      }}
                    >
                      ✅ Your request is now <strong>pending review</strong> by
                      our team.
                      <br />
                      📧 You'll receive a confirmation email within{" "}
                      <strong>48 hours</strong>.<br />
                      🏠 Our adoption team will reach out to arrange a meet &
                      greet.
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                      width: "100%",
                    }}
                  >
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => navigate("/")}
                      sx={{
                        py: 1.8,
                        borderRadius: "16px",
                        fontWeight: 800,
                        textTransform: "none",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        boxShadow: "0 10px 30px rgba(102,126,234,0.4)",
                      }}
                    >
                      Back to Home
                    </Button>
                    <Button
                      variant="text"
                      fullWidth
                      onClick={handleCloseModal}
                      sx={{
                        color: "#94A3B8",
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Browse More Pets
                    </Button>
                  </Box>
                </Box>
              ) : (
                /* ── DEFAULT STATE ── */
                <>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 3,
                      }}
                    >
                      <VerifiedRounded
                        sx={{ color: "#3f51b5", fontSize: 18 }}
                      />
                      <Typography
                        sx={{
                          color: "#3f51b5",
                          fontWeight: 800,
                          fontSize: "0.85rem",
                          textTransform: "uppercase",
                          letterSpacing: 1,
                        }}
                      >
                        Vet Verified & Ready
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 2,
                        mb: 4,
                      }}
                    >
                      {[
                        { label: "Age", value: selectedPet.age || "2 years" },
                        {
                          label: "Gender",
                          value: selectedPet.gender || "Unknown",
                        },
                        { label: "Size", value: selectedPet.size || "Medium" },
                        {
                          label: "Species",
                          value: selectedPet.species || "Unknown",
                        },
                      ].map(({ label, value }) => (
                        <Box
                          key={label}
                          sx={{
                            bgcolor: "#F8FAFC",
                            borderRadius: "16px",
                            p: 2,
                            border: "1px solid #EAECF0",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.7rem",
                              color: "#94A3B8",
                              fontWeight: 800,
                              textTransform: "uppercase",
                              letterSpacing: 1,
                              mb: 0.5,
                            }}
                          >
                            {label}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 800,
                              color: "#1A1A1A",
                              fontSize: "0.95rem",
                            }}
                          >
                            {value}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        color: "#94A3B8",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        mb: 1.5,
                      }}
                    >
                      About {selectedPet.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#475569",
                        lineHeight: 1.8,
                        fontSize: "0.97rem",
                        mb: 4,
                      }}
                    >
                      {selectedPet.description ||
                        `${selectedPet.name} is a healthy, loving ${selectedPet.breed || selectedPet.species} with a wonderful temperament. They enjoy playtime, get along well with families, and are eager to find a forever home filled with love and care.`}
                    </Typography>

                    <Box
                      sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 4 }}
                    >
                      {[
                        "Friendly",
                        "Vaccinated",
                        "House-trained",
                        "Good with kids",
                      ].map((trait) => (
                        <Chip
                          key={trait}
                          label={trait}
                          size="small"
                          sx={{
                            bgcolor: "#EEF2FF",
                            color: "#3f51b5",
                            fontWeight: 700,
                            borderRadius: "8px",
                            fontSize: "0.75rem",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                  >
                    {/* ── UPDATED ADOPT BUTTON WITH LOGIC ── */}
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled={
                        user?.email === "admin@petstore.com" ||
                        user?.role === "ADMIN"
                      }
                      onClick={() => {
                        if (user) {
                          addToCart(selectedPet); // Add to Cart Context
                          setAdopted(true); // Trigger the Success UI
                        } else {
                          handleCloseModal();
                          navigate("/login");
                        }
                      }}
                      sx={{
                        py: 2,
                        borderRadius: "16px",
                        fontWeight: 800,
                        fontSize: "1rem",
                        textTransform: "none",
                        background:
                          user?.email === "admin@petstore.com" ||
                          user?.role === "ADMIN"
                            ? "#E2E8F0"
                            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        boxShadow:
                          user?.email === "admin@petstore.com" ||
                          user?.role === "ADMIN"
                            ? "none"
                            : "0 10px 30px rgba(102,126,234,0.4)",
                        "&:hover": {
                          boxShadow:
                            user?.email === "admin@petstore.com" ||
                            user?.role === "ADMIN"
                              ? "none"
                              : "0 14px 40px rgba(102,126,234,0.5)",
                        },
                      }}
                    >
                      {user?.email === "admin@petstore.com" ||
                      user?.role === "ADMIN"
                        ? "Admins manage pets in Dashboard 📋"
                        : user
                          ? `Adopt ${selectedPet.name} 🐾`
                          : `Sign In to Adopt ${selectedPet.name} 🐾`}
                    </Button>
                    <Button
                      variant="text"
                      fullWidth
                      onClick={handleCloseModal}
                      sx={{
                        color: "#94A3B8",
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Maybe later
                    </Button>
                  </Box>
                </>
              )}
            </DialogContent>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}
