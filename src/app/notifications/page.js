import NotificationList from '@/components/NotificationList';
import { Box, Container, AppBar, Toolbar, Typography, Button } from '@mui/material';


export default function NotificationsPage() {
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
            All
          </Button>
          <Button color="inherit" href="/notifications/top" sx={{ fontSize: { xs: '0.75rem', sm: '1rem' }, px: { xs: 0.5, sm: 1 } }}>
            Top Priority
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
        <NotificationList />
      </Container>
    </>
  );
}
