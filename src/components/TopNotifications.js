'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Alert
} from '@mui/material';
import axios from 'axios';
import { Log } from '../../logging_middleware/logger';

export default function TopNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topN, setTopN] = useState(10);
  const [error, setError] = useState(null);

  const PRIORITY = {
    'Placement': 3,
    'Result': 2,
    'Event': 1
  };

  useEffect(() => {
    fetchTopNotifications();
  }, [topN]);

  async function fetchTopNotifications() {
    try {
      setLoading(true);
      setError(null);
      // Fetch with standard page size to get available notifications
      const response = await axios.get('/api/notifications?limit=10&page=1');

      const allNotifs = response.data.notifications || [];
      
      // Add priority and sort
      const withPriority = allNotifs.map(n => ({
        ...n,
        priority: PRIORITY[n.Type] || 0
      }));

      const sorted = withPriority.sort((a, b) => {
        if (b.priority !== a.priority) {
          return b.priority - a.priority;
        }
        const timeA = new Date(a.Timestamp).getTime();
        const timeB = new Date(b.Timestamp).getTime();
        return timeB - timeA;
      });

      setNotifications(sorted.slice(0, topN));
    } catch (err) {
      console.error('Error:', err.message);
      
      if (err.response?.status === 401) {
        await Log('fatal', 'page', 'Token Expired');
        setError('Session Expired. Please update your token');
      } else {
        await Log('error', 'page', 'API call failed');
        setError('Failed to load notifications. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  const getPriorityColor = (type) => {
    if (type === 'Placement') return '#d32f2f';
    if (type === 'Result') return '#f57c00';
    return '#1976d2';
  };

  const priorityLevel = (type) => {
    if (type === 'Placement') return 'HIGH';
    if (type === 'Result') return 'MEDIUM';
    return 'LOW';
  };

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
      <Typography variant="h4" sx={{ mb: { xs: 2, sm: 3 }, fontWeight: 'bold', fontSize: { xs: '1.8rem', sm: '2.125rem' } }}>
        Top Priority Notifications
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 3 }}>
        <TextField
          label="Show Top N"
          type="number"
          value={topN}
          onChange={(e) => setTopN(parseInt(e.target.value) || 10)}
          slotProps={{
            input: {
              min: 1,
              max: 50
            }
          }}
          sx={{ width: { xs: '100%', sm: 150 } }}
        />
      </Box>

      {loading ? (
        <Typography sx={{ textAlign: 'center', py: 4, fontSize: { xs: '0.95rem', sm: '1rem' } }}>Loading...</Typography>
      ) : notifications.length === 0 ? (
        <Typography sx={{ textAlign: 'center', py: 4, color: '#999', fontSize: { xs: '0.95rem', sm: '1rem' } }}>No notifications found</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
          {notifications.map((notif, index) => (
            <Card
              key={notif.ID}
              sx={{
                borderLeft: `6px solid ${getPriorityColor(notif.Type)}`,
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1.5, sm: 2 } }}>
                  <Box sx={{ 
                    bgcolor: getPriorityColor(notif.Type), 
                    color: '#fff', 
                    px: { xs: 1, sm: 1.5 }, 
                    py: { xs: 0.75, sm: 1 },
                    borderRadius: '4px',
                    fontWeight: 700,
                    fontSize: { xs: '0.95rem', sm: '1.1rem' },
                    minWidth: { xs: '36px', sm: '40px' },
                    textAlign: 'center',
                    flexShrink: 0
                  }}>
                    {index + 1}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 0.5, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                      {notif.Type}
                    </Typography>
                    <Typography sx={{ color: getPriorityColor(notif.Type), fontWeight: 600, mb: 1, fontSize: { xs: '0.85rem', sm: '0.95rem' } }}>
                      [{priorityLevel(notif.Type)}]
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize: { xs: '0.9rem', sm: '1rem' }, color: '#333', lineHeight: 1.5 }}>
                      {notif.Message}
                    </Typography>
                    <Typography sx={{ color: '#999', fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
                      {notif.Timestamp || 'N/A'}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
