import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography, Button, Box, Table, TableBody, TableCell,
  TableHead, TableRow, Paper, TextField, Dialog, DialogTitle,
  DialogContent, DialogActions, IconButton, Avatar, Select, MenuItem,
  FormControl, InputLabel, Chip, Tooltip, InputAdornment,
} from "@mui/material";
import {
  DeleteRounded, EditRounded, AddRounded, PetsRounded,
  FavoriteRounded, MedicalServicesRounded, EventAvailableRounded,
  AutoGraphRounded, SearchRounded, DashboardRounded,
  PeopleRounded, AssignmentRounded, OpenInNewRounded,
  LogoutRounded, NotificationsRounded, SettingsRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// 1. IMPORT USE AUTH
import { useAuth } from "../context/AuthContext";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/pets`;

const SPECIES_COLORS: Record<string, { bg: string; color: string }> = {
  Dog:    { bg: "#EEF2FF", color: "#4F46E5" },
  Cat:    { bg: "#FDF2F8", color: "#DB2777" },
  Bird:   { bg: "#ECFDF5", color: "#059669" },
  Rabbit: { bg: "#FFF7ED", color: "#EA580C" },
};

const NAV_ITEMS = [
  { label: "Dashboard",         icon: <DashboardRounded fontSize="small" />,     key: "dashboard" },
  { label: "Roster",            icon: <PetsRounded fontSize="small" />,          key: "roster" },
  { label: "Pending Adoptions", icon: <AssignmentRounded fontSize="small" />,    key: "pending" },
  { label: "Users",             icon: <PeopleRounded fontSize="small" />,        key: "users" },
];

type ActivePage = "dashboard" | "roster" | "pending" | "users";

// ── Placeholder pages ──────────────────────────────────────────────
function DashboardPage({ pets }: { pets: any[] }) {
  return (
    <Box>
      <Typography variant="overline" sx={{ color: "#64748B", fontWeight: 700, letterSpacing: 2, fontSize: "0.7rem" }}>Overview</Typography>
      <Typography variant="h4" sx={{ fontWeight: 900, color: "#0F172A", letterSpacing: -1, mt: 0.5, mb: 1 }}>Dashboard</Typography>
      <Typography sx={{ color: "#64748B", mb: 5 }}>Welcome back, Admin. Here's what's happening today.</Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4,1fr)" }, gap: 3 }}>
        {[
          { title: "Total Roster",   value: pets.length, icon: <PetsRounded />,             color: "#3B82F6", bg: "#EFF6FF", border: "#BFDBFE" },
          { title: "Meet & Greets",  value: 12,          icon: <EventAvailableRounded />,    color: "#10B981", bg: "#ECFDF5", border: "#A7F3D0" },
          { title: "Vet Clearances", value: 3,           icon: <MedicalServicesRounded />,   color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A" },
          { title: "Placement Rate", value: "94%",       icon: <AutoGraphRounded />,         color: "#8B5CF6", bg: "#F5F3FF", border: "#DDD6FE" },
        ].map((stat) => (
          <Paper key={stat.title} sx={{ p: 3, borderRadius: "20px", border: `1px solid ${stat.border}`, boxShadow: "none", bgcolor: "#fff", display: "flex", alignItems: "center", gap: 2.5, transition: "transform 0.2s", "&:hover": { transform: "translateY(-3px)" } }}>
            <Box sx={{ bgcolor: stat.bg, color: stat.color, borderRadius: "14px", p: 1.5, display: "flex" }}>{stat.icon}</Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 900, color: "#0F172A", lineHeight: 1 }}>{stat.value}</Typography>
              <Typography sx={{ color: "#64748B", fontWeight: 600, fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: 0.5, mt: 0.5 }}>{stat.title}</Typography>
            </Box>
          </Paper>
        ))}
      </Box>
      <Box sx={{ mt: 5, p: 6, borderRadius: "20px", bgcolor: "#fff", border: "1px solid #E2E8F0", textAlign: "center" }}>
        <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>📊</Typography>
        <Typography sx={{ fontWeight: 800, color: "#1E293B", mb: 0.5 }}>Analytics coming soon</Typography>
        <Typography sx={{ color: "#94A3B8", fontSize: "0.9rem" }}>Charts and adoption trends will appear here.</Typography>
      </Box>
    </Box>
  );
}

function PlaceholderPage({ title, emoji, desc }: { title: string; emoji: string; desc: string }) {
  return (
    <Box>
      <Typography variant="overline" sx={{ color: "#64748B", fontWeight: 700, letterSpacing: 2, fontSize: "0.7rem" }}>Admin</Typography>
      <Typography variant="h4" sx={{ fontWeight: 900, color: "#0F172A", letterSpacing: -1, mt: 0.5, mb: 5 }}>{title}</Typography>
      <Box sx={{ p: 8, borderRadius: "20px", bgcolor: "#fff", border: "1px solid #E2E8F0", textAlign: "center" }}>
        <Typography sx={{ fontSize: "3rem", mb: 2 }}>{emoji}</Typography>
        <Typography sx={{ fontWeight: 800, color: "#1E293B", mb: 0.5 }}>{title} coming soon</Typography>
        <Typography sx={{ color: "#94A3B8", fontSize: "0.9rem" }}>{desc}</Typography>
      </Box>
    </Box>
  );
}

// ── Main Component ─────────────────────────────────────────────────
export default function Admin() {
  const [pets, setPets] = useState<any[]>([]);
  const [activePage, setActivePage] = useState<ActivePage>("roster");
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    id: null as any, name: "", species: "", breed: "",
    age: "", gender: "", size: "", imageUrl: "", description: "", price: 200 // Added default price
  });
  
  const navigate = useNavigate();
  // 2. USE AUTH HOOK
  const { user, logout } = useAuth(); 

  // 3. CREATE AXIOS CONFIG WITH TOKEN
  const authConfig = {
    headers: { Authorization: `Bearer ${user?.token}` }
  };

  function fetchPets() {
    axios.get(API_URL).then((res) => setPets(res.data)).catch(console.error);
  }
  
  useEffect(() => { fetchPets(); }, []);

  function handleSave() {
    setIsSaving(true);
    // 4. ATTACH THE TOKEN TO POST/PUT REQUESTS
    const req = formData.id
      ? axios.put(`${API_URL}/${formData.id}`, formData, authConfig)
      : axios.post(API_URL, formData, authConfig);
      
    req.then(() => { 
      fetchPets(); 
      setOpen(false); 
    }).catch(err => {
      console.error("Failed to save pet:", err);
      if(err.response?.status === 403) alert("Session expired. Please log in again.");
    }).finally(() => {
      setIsSaving(false);
    });
  }

  function handleDelete(id: number) {
    // 5. ATTACH THE TOKEN TO DELETE REQUESTS
    axios.delete(`${API_URL}/${id}`, authConfig)
      .then(fetchPets)
      .catch(console.error);
  }

  function openForm(pet: any = null) {
    if (pet?.id) {
      const valid = ["Dog", "Cat", "Bird", "Rabbit"];
      const ok = valid.includes(pet.species);
      setFormData({ id: pet.id, name: pet.name || "", species: ok ? pet.species : "", breed: pet.breed || (!ok ? pet.species : ""), age: pet.age || "", gender: pet.gender || "", size: pet.size || "", imageUrl: pet.imageUrl || "", description: pet.description || "", price: pet.price || 200 });
    } else {
      setFormData({ id: null, name: "", species: "", breed: "", age: "", gender: "", size: "", imageUrl: "", description: "", price: 200 });
    }
    setOpen(true);
  }

  const filteredPets = pets.filter((p) =>
    [p.name, p.species, p.breed].some((f) => f?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F8FAFC" }}>

      {/* ── Sidebar ── */}
      <Box sx={{
        width: 240, flexShrink: 0, bgcolor: "#0F172A",
        display: "flex", flexDirection: "column",
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100,
      }}>
        {/* Brand */}
        <Box sx={{ px: 3, pt: 3, pb: 2, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, cursor: "pointer" }} onClick={() => navigate("/")}>
            <Box sx={{ bgcolor: "#3B82F6", borderRadius: "10px", p: 0.8, display: "flex" }}>
              <FavoriteRounded sx={{ color: "#fff", fontSize: 18 }} />
            </Box>
            <Typography sx={{ fontWeight: 900, color: "#fff", letterSpacing: 1, fontSize: "0.95rem" }}>
              SHELTER<Box component="span" sx={{ fontWeight: 300, opacity: 0.4 }}>OS</Box>
            </Typography>
          </Box>
        </Box>

        {/* Nav */}
        <Box sx={{ px: 2, pt: 3, flexGrow: 1 }}>
          <Typography sx={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, px: 1, mb: 1.5 }}>
            Main Menu
          </Typography>
          {NAV_ITEMS.map(({ label, icon, key }) => {
            const isActive = activePage === key;
            return (
              <Box
                key={key}
                onClick={() => setActivePage(key as ActivePage)}
                sx={{
                  display: "flex", alignItems: "center", gap: 1.5,
                  px: 2, py: 1.3, borderRadius: "10px", mb: 0.5, cursor: "pointer",
                  bgcolor: isActive ? "rgba(59,130,246,0.15)" : "transparent",
                  color: isActive ? "#60A5FA" : "rgba(255,255,255,0.5)",
                  transition: "all 0.15s",
                  "&:hover": { bgcolor: isActive ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.06)", color: isActive ? "#60A5FA" : "#fff" },
                }}
              >
                {isActive && <Box sx={{ width: 3, height: 18, bgcolor: "#3B82F6", borderRadius: "2px", position: "absolute", left: 16 }} />}
                <Box sx={{ color: "inherit", display: "flex" }}>{icon}</Box>
                <Typography sx={{ fontWeight: isActive ? 700 : 500, fontSize: "0.88rem", color: "inherit" }}>{label}</Typography>
              </Box>
            );
          })}

          <Box sx={{ mt: 3, mb: 1 }}>
            <Typography sx={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, px: 1, mb: 1.5 }}>
              Quick Links
            </Typography>
            <Box onClick={() => navigate("/")} sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2, py: 1.3, borderRadius: "10px", cursor: "pointer", color: "rgba(255,255,255,0.4)", "&:hover": { bgcolor: "rgba(255,255,255,0.06)", color: "#fff" }, transition: "all 0.15s" }}>
              <OpenInNewRounded fontSize="small" />
              <Typography sx={{ fontSize: "0.88rem", fontWeight: 500, color: "inherit" }}>Public Site</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2, py: 1.3, borderRadius: "10px", cursor: "pointer", color: "rgba(255,255,255,0.4)", "&:hover": { bgcolor: "rgba(255,255,255,0.06)", color: "#fff" }, transition: "all 0.15s" }}>
              <SettingsRounded fontSize="small" />
              <Typography sx={{ fontSize: "0.88rem", fontWeight: 500, color: "inherit" }}>Settings</Typography>
            </Box>
          </Box>
        </Box>

        {/* User Footer */}
        <Box sx={{ px: 3, py: 2.5, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 1.5 }}>
          {/* Display Dynamic Initial */}
          <Avatar sx={{ width: 32, height: 32, bgcolor: "#1E40AF", fontSize: "0.8rem", fontWeight: 700 }}>
            {user?.email?.[0]?.toUpperCase() || "A"}
          </Avatar>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "0.82rem", lineHeight: 1.2 }}>
              {user?.email?.split('@')[0] || "Admin"}
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user?.email || "admin@petstore.com"}
            </Typography>
          </Box>
          <Tooltip title="Sign out">
            <IconButton onClick={() => { logout(); navigate("/login"); }} size="small" sx={{ color: "rgba(255,255,255,0.3)", "&:hover": { color: "#fff" } }}>
              <LogoutRounded fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* ── Main Content ── */}
      <Box sx={{ ml: "240px", flexGrow: 1, display: "flex", flexDirection: "column" }}>

        {/* Top Bar */}
        <Box sx={{ position: "sticky", top: 0, zIndex: 50, bgcolor: "rgba(248,250,252,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid #E2E8F0", px: 4, py: 1.5, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
          <Tooltip title="Notifications">
            <IconButton size="small" sx={{ color: "#64748B", "&:hover": { color: "#1E293B" } }}>
              <NotificationsRounded fontSize="small" />
            </IconButton>
          </Tooltip>
          <Chip label="Admin" size="small" sx={{ bgcolor: "#EEF2FF", color: "#4F46E5", fontWeight: 700, fontSize: "0.72rem" }} />
        </Box>

        {/* Page Body */}
        <Box sx={{ p: { xs: 3, md: 5 }, flexGrow: 1 }}>

          {/* Dashboard */}
          {activePage === "dashboard" && <DashboardPage pets={pets} />}

          {/* Pending / Users placeholders */}
          {activePage === "pending" && <PlaceholderPage title="Pending Adoptions" emoji="📋" desc="Adoption applications and approvals will appear here." />}
          {activePage === "users" && <PlaceholderPage title="Users" emoji="👥" desc="Registered user accounts and roles will appear here." />}

          {/* ── Roster Page ── */}
          {activePage === "roster" && (
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 5 }}>
                <Box>
                  <Typography variant="overline" sx={{ color: "#64748B", fontWeight: 700, letterSpacing: 2, fontSize: "0.7rem" }}>Pet Management</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: "#0F172A", letterSpacing: -1, mt: 0.5 }}>Companion Roster</Typography>
                </Box>
                <Button variant="contained" size="large" startIcon={<AddRounded />} onClick={() => openForm()}
                  sx={{ borderRadius: "12px", fontWeight: 800, px: 3.5, py: 1.5, textTransform: "none", bgcolor: "#1E293B", "&:hover": { bgcolor: "#0F172A" }, boxShadow: "0 4px 14px rgba(0,0,0,0.2)" }}>
                  Intake New Pet
                </Button>
              </Box>

              <Paper sx={{ borderRadius: "20px", overflow: "hidden", border: "1px solid #E2E8F0", boxShadow: "none", bgcolor: "#fff" }}>
                {/* Table Toolbar */}
                <Box sx={{ px: 3, py: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #F1F5F9" }}>
                  <Box>
                    <Typography sx={{ fontWeight: 800, color: "#1E293B" }}>Active Companions</Typography>
                    <Typography sx={{ color: "#94A3B8", fontSize: "0.8rem", fontWeight: 600 }}>{filteredPets.length} records</Typography>
                  </Box>
                  {/* FIX 6: Removed standard InputProps directly on the TextField in favor of slotProps if using modern MUI, but slotProps is better. I used standard InputProps correctly to avoid the React warning */}
                  <TextField 
                    placeholder="Search roster..." size="small" value={search} onChange={(e) => setSearch(e.target.value)}
                    slotProps={{ input: { 
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchRounded sx={{ color: "#94A3B8", fontSize: 18 }} />
                        </InputAdornment>
                      )
                    } }}
                    sx={{ width: 240, "& .MuiOutlinedInput-root": { borderRadius: "10px", bgcolor: "#F8FAFC", "& fieldset": { borderColor: "#E2E8F0" }, "&.Mui-focused fieldset": { borderColor: "#3B82F6" } } }}
                  />
                </Box>

                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#F8FAFC" }}>
                      {["Profile", "Classification", "Demographics", "Status", "Actions"].map((h, i) => (
                        <TableCell key={h} align={i === 4 ? "right" : "left"}
                          sx={{ fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 1, fontSize: "0.7rem", py: 1.5, borderBottom: "1px solid #F1F5F9" }}>
                          {h}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredPets.map((pet) => (
                      <TableRow key={pet.id} sx={{ "&:hover": { bgcolor: "#F8FAFC" }, "& td": { borderBottom: "1px solid #F8FAFC" } }}>
                        <TableCell sx={{ py: 2 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Avatar src={pet.imageUrl} variant="rounded" sx={{ width: 52, height: 52, borderRadius: "14px", border: "1px solid #E2E8F0" }} />
                            <Box>
                              <Typography sx={{ fontWeight: 800, color: "#0F172A", fontSize: "0.95rem" }}>{pet.name}</Typography>
                              <Typography sx={{ color: "#94A3B8", fontSize: "0.78rem", fontWeight: 600 }}>#{pet.id?.toString().padStart(4, "0")}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip label={pet.species || "Unknown"} size="small"
                            sx={{ fontWeight: 700, borderRadius: "8px", fontSize: "0.75rem", mb: 0.5, bgcolor: SPECIES_COLORS[pet.species]?.bg ?? "#F1F5F9", color: SPECIES_COLORS[pet.species]?.color ?? "#475569" }} />
                          <Typography sx={{ color: "#475569", fontSize: "0.85rem", fontWeight: 600, display: "block" }}>{pet.breed || "Mixed"}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography sx={{ fontWeight: 700, color: "#334155", fontSize: "0.9rem" }}>{pet.age || "—"}</Typography>
                          <Typography sx={{ color: "#94A3B8", fontSize: "0.82rem" }}>{pet.gender || "—"} · {pet.size || "—"}</Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, bgcolor: "#ECFDF5", borderRadius: "8px", px: 1.5, py: 0.6, width: "fit-content" }}>
                            <MedicalServicesRounded sx={{ fontSize: 14, color: "#059669" }} />
                            <Typography sx={{ fontSize: "0.75rem", fontWeight: 800, color: "#059669" }}>Cleared</Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Edit">
                            <IconButton onClick={() => openForm(pet)} sx={{ color: "#3B82F6", bgcolor: "#EFF6FF", mr: 1, borderRadius: "10px", "&:hover": { bgcolor: "#DBEAFE" } }}>
                              <EditRounded fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton onClick={() => handleDelete(pet.id)} sx={{ color: "#EF4444", bgcolor: "#FEF2F2", borderRadius: "10px", "&:hover": { bgcolor: "#FEE2E2" } }}>
                              <DeleteRounded fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredPets.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 12 }}>
                          <Box sx={{ bgcolor: "#F1F5F9", borderRadius: "50%", width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2 }}>
                            <PetsRounded sx={{ color: "#94A3B8", fontSize: 32 }} />
                          </Box>
                          <Typography sx={{ fontWeight: 800, color: "#1E293B", fontSize: "1.1rem", mb: 0.5 }}>
                            {search ? "No matches found" : "Roster is empty"}
                          </Typography>
                          <Typography sx={{ color: "#64748B", mb: 3 }}>
                            {search ? `No pets match "${search}"` : "Begin intake for your first companion."}
                          </Typography>
                          {!search && (
                            <Button variant="outlined" onClick={() => openForm()} startIcon={<AddRounded />} sx={{ borderRadius: "10px", fontWeight: 700, textTransform: "none" }}>
                              Start Intake
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Paper>
            </Box>
          )}
        </Box>
      </Box>

      {/* ── Dialog ── */}
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="md" 
        fullWidth 
        disableRestoreFocus 
        disableEnforceFocus 
        sx={{ "& .MuiDialog-paper": { borderRadius: "24px" } }}
      >
        <DialogTitle sx={{ fontWeight: 900, fontSize: "1.4rem", pt: 4, px: 4, pb: 1 }}>
          {formData.id ? "Update Companion Profile" : "Intake New Companion"}
          <Typography sx={{ fontWeight: 500, fontSize: "0.9rem", color: "#64748B", mt: 0.5 }}>
            {formData.id ? "Edit details and save changes." : "Fill in details to register a new pet."}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ px: 4, pt: "20px !important", display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr 1.5fr" }, gap: 2.5 }}>
            <TextField label="Name" fullWidth value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }} />
            <FormControl fullWidth>
              <InputLabel>Species</InputLabel>
              <Select value={formData.species} label="Species" onChange={(e) => setFormData({ ...formData, species: e.target.value })} sx={{ borderRadius: "12px" }}>
                {["Dog", "Cat", "Bird", "Rabbit"].map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField label="Breed" fullWidth value={formData.breed} onChange={(e) => setFormData({ ...formData, breed: e.target.value })} sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }} />
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 2.5 }}>
            {[["Age", "age"], ["Gender", "gender"], ["Size", "size"]].map(([label, key]) => (
              <TextField key={key} label={label} fullWidth value={(formData as any)[key]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }} />
            ))}
          </Box>
          <TextField label="Image URL" fullWidth value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }} />
          {formData.imageUrl && (
            <Box sx={{ borderRadius: "16px", overflow: "hidden", height: 180, border: "1px solid #E2E8F0" }}>
              <img src={formData.imageUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => (e.currentTarget.style.display = "none")} />
            </Box>
          )}
          <TextField label="Behavioral Notes & Backstory" fullWidth multiline rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }} />
        </DialogContent>
        <DialogActions sx={{ p: 4, pt: 2, bgcolor: "#F8FAFC", borderTop: "1px solid #F1F5F9", gap: 1 }}>
          <Button onClick={() => setOpen(false)} sx={{ fontWeight: 700, color: "#64748B", textTransform: "none", borderRadius: "10px", px: 3 }}>Cancel</Button>
          <Button onClick={handleSave} disabled={isSaving} variant="contained"
            sx={{ fontWeight: 800, borderRadius: "12px", px: 4, py: 1.2, textTransform: "none", bgcolor: "#1E293B", "&:hover": { bgcolor: "#0F172A" }, boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}>
            {formData.id ? "Save Changes" : isSaving ? "Saving..." : "Complete Intake"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}