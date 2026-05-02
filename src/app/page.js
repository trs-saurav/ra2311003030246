import { Container, AppBar, Toolbar, Typography, Button, Box, Card, CardContent, Grid } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';


export const metadata = {
  title: 'Campus Notifications',
  description: 'View campus notifications'
};

export default function Home() {
  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ gap: { xs: 0.5, sm: 1 } }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Campus Notifications
          </Typography>
          <Button color="inherit" href="/" sx={{ fontSize: { xs: '0.75rem', sm: '1rem' }, px: { xs: 0.5, sm: 1 } }}>
            Home
          </Button>
          <Button color="inherit" href="/notifications" sx={{ fontSize: { xs: '0.75rem', sm: '1rem' }, px: { xs: 0.5, sm: 1 } }}>
            All Notifications
          </Button>
          <Button color="inherit" href="/notifications/top" sx={{ fontSize: { xs: '0.75rem', sm: '1rem' }, px: { xs: 0.5, sm: 1 } }}>
            Top Priority
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 8 }, display: 'flex', flexDirection: 'column', alignItems: 'center', px: { xs: 2, sm: 3 } }}>
        {/* Hero Section */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: { xs: 6, sm: 10 }, 
          width: '100%',
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          borderRadius: '16px',
          py: { xs: 4, sm: 6 },
          px: { xs: 2, sm: 4 },
          color: '#fff'
        }}>
          <NotificationsIcon sx={{ fontSize: { xs: '2.5rem', sm: '3.5rem' }, mb: 2 }} />
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' } }}>
            Campus Notification Hub
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: { xs: '0.95rem', sm: '1.25rem' } }}>
            Never miss important updates about placements, results, and college events
          </Typography>
        </Box>


      </Container>
    </>
  );
}
