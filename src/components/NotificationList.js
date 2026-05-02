'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Stack,
  Alert
} from '@mui/material';
import axios from 'axios';
import { Log } from '../../logging_middleware/logger';

export default function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filterType, setFilterType] = useState('');
  const [viewedIds, setViewedIds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, [page, filterType]);

  async function fetchNotifications() {
    try {
      setLoading(true);
      setError(null);
      let url = `/api/notifications?limit=${limit}&page=${page}`;
      if (filterType) {
        url += `&notification_type=${filterType}`;
      }

      const response = await axios.get(url);

      setNotifications(response.data.notifications || []);
    } catch (err) {
      console.error('Error fetching:', err.message);
      
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

  function markAsViewed(id) {
    if (!viewedIds.includes(id)) {
      setViewedIds([...viewedIds, id]);
    }
  }

  function isNew(id) {
    return !viewedIds.includes(id);
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
        Notifications
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }} sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: { xs: '100%', sm: 200 } }}>
          <InputLabel>Filter by Type</InputLabel>
          <Select
            value={filterType}
            label="Filter by Type"
            onChange={(e) => {
              setFilterType(e.target.value);
              setPage(1);
            }}
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {loading ? (
        <Typography sx={{ textAlign: 'center', py: 4, fontSize: { xs: '0.95rem', sm: '1rem' } }}>Loading...</Typography>
      ) : notifications.length === 0 ? (
        <Typography sx={{ textAlign: 'center', py: 4, color: '#999', fontSize: { xs: '0.95rem', sm: '1rem' } }}>No notifications found</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 }, mb: 3 }}>
          {notifications.map((notif) => (
            <Card
              key={notif.ID}
              sx={{
                borderLeft: `6px solid ${getPriorityColor(notif.Type)}`,
                backgroundColor: isNew(notif.ID) ? '#fafafa' : '#ffffff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <CardContent sx={{ p: { xs: 1.75, sm: 2.5 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: { xs: 1, sm: 2 }, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                        {notif.Type}
                      </Typography>
                      {isNew(notif.ID) && (
                        <Typography sx={{ 
                          bgcolor: '#d32f2f', 
                          color: '#fff', 
                          px: 1, 
                          py: 0.5, 
                          borderRadius: '4px',
                          fontSize: { xs: '10px', sm: '11px' },
                          fontWeight: 600
                        }}>
                          NEW
                        </Typography>
                      )}
                    </Box>
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
                  {isNew(notif.ID) && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => markAsViewed(notif.ID)}
                      sx={{ 
                        whiteSpace: 'nowrap',
                        backgroundColor: '#1976d2',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        py: { xs: 0.5, sm: 0.75 },
                        px: { xs: 1, sm: 1.5 },
                        '&:hover': {
                          backgroundColor: '#1565c0'
                        }
                      }}
                    >
                      Mark as Read
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={5}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
}
