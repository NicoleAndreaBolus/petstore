import { useState } from "react";
import { Box, Typography, IconButton, Drawer, Button, Stack, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { CloseRounded, CalendarMonthRounded, PetsRounded, DeleteOutlineRounded } from "@mui/icons-material";
import { useCart } from "../context/CartContext"; 
import { useNavigate } from "react-router-dom";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cartItems, removeFromCart, clearCart } = useCart(); 
  const navigate = useNavigate();

  // State for the Scheduling Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const handleCheckout = () => {
    // 1. Close Modal & Drawer
    setIsModalOpen(false);
    onClose();
    
    // 2. Clear the cart 
    clearCart();

    // 3. Show success alert (we'll replace this with the Admin backend next!)
    alert(`Success! Your Meet & Greet is scheduled for ${scheduleDate} at ${scheduleTime}. The admin will review it shortly!`);
  };

  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose} sx={{ "& .MuiDrawer-paper": { width: { xs: '100%', sm: 400 }, borderRadius: { sm: '24px 0 0 24px' } } }}>
        
        {/* Drawer Header */}
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ p: 1, bgcolor: '#E3F2FD', borderRadius: '12px', display: 'flex' }}>
              <CalendarMonthRounded sx={{ color: "#1976D2", fontSize: 24 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#1A1A1A" }}>
              Meet & Greet 
            </Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ bgcolor: "#F3F4F6", transition: 'all 0.2s', '&:hover': { bgcolor: '#E5E7EB', transform: 'rotate(90deg)' } }}>
            <CloseRounded />
          </IconButton>
        </Box>

        {/* Drawer Body */}
        <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: cartItems.length === 0 ? 'center' : 'flex-start', overflowY: 'auto' }}>
          
          {cartItems.length === 0 ? (
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ width: 80, height: 80, bgcolor: '#F9FAFB', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
                <PetsRounded sx={{ fontSize: 40, color: '#D1D5DB' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#1A1A1A", mb: 1 }}>No introductions scheduled</Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 4, px: 2 }}>Your future best friend is waiting!</Typography>
              <Button variant="outlined" onClick={() => { onClose(); navigate("/"); }} sx={{ borderRadius: "100px", px: 4, py: 1.2, fontWeight: 700, textTransform: "none", color: '#1A1A1A', borderColor: 'rgba(0,0,0,0.1)' }}>
                Meet the Companions
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 700, mb: 3, textTransform: 'uppercase', letterSpacing: 1 }}>
                Pending Requests ({cartItems.length})
              </Typography>
              
              <Stack spacing={2}>
                {cartItems.map((item) => (
                   <Box key={item.id} sx={{ p: 2, border: '1px solid #F0F0F0', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          {/* UPDATED UI: Showing Image and Name! */}
                          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                             <Avatar src={item.imageUrl} variant="rounded" sx={{ width: 56, height: 56, borderRadius: '12px' }} />
                             <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{item.name}</Typography>
                                <Typography variant="body2" color="text.secondary">Pet ID: #{item.productId} • {item.species}</Typography>
                             </Box>
                          </Box>
                          <IconButton size="small" onClick={() => removeFromCart(item.id)} sx={{ color: 'error.main', bgcolor: '#FEF2F2' }}>
                              <DeleteOutlineRounded fontSize="small" />
                          </IconButton>
                      </Box>

                   </Box>
                ))}
              </Stack>

              <Button 
                  fullWidth 
                  variant="contained" 
                  onClick={() => setIsModalOpen(true)} // Opens the modal!
                  sx={{ mt: 4, py: 1.5, borderRadius: '12px', fontWeight: 700, textTransform: 'none', bgcolor: '#1A1A1A', '&:hover': { bgcolor: '#333' } }}
              >
                  Confirm Scheduling
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>

      {/* SCHEDULING MODAL */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} sx={{ "& .MuiDrawer-paper": { borderRadius: '24px', p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.4rem' }}>
          Select Date & Time
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            When would you like to visit the shelter?
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: '20px !important' }}>
          <TextField 
            label="Date" type="date" slotProps={{ inputLabel: { shrink: true } }} fullWidth 
            value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
          />
          <TextField 
            label="Time" type="time" slotProps={{ inputLabel: { shrink: true } }} fullWidth 
            value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setIsModalOpen(false)} sx={{ fontWeight: 700, color: 'text.secondary' }}>Cancel</Button>
          <Button 
            variant="contained" onClick={handleCheckout} 
            disabled={!scheduleDate || !scheduleTime}
            sx={{ borderRadius: '12px', fontWeight: 700, px: 3, textTransform: 'none', bgcolor: '#1976D2' }}
          >
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}