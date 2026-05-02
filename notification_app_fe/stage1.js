import axios from 'axios';
import dotenv from 'dotenv';
import { Log } from '../logging_middleware/logger.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

// API configuration from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

// Priority weights for notification types
const PRIORITY = {
  "Placement": 3,
  "Result": 2,
  "Event": 1
};

// Fetch notifications from the API
async function fetchNotifications() {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`
      }
    });

    const notifications = response.data.notifications || [];
    await Log('info', 'page', `Got ${notifications.length} items`);
    return notifications;

  } catch (error) {
    await Log('error', 'page', `API call failed`);
    throw error;
  }
}

// Add priority score to each notification
function addPriority(notifications) {
  return notifications.map(notif => ({
    ...notif,
    priority: PRIORITY[notif.Type] || 0
  }));
}

// Sort notifications by priority and recency
function sortByPriority(notifications) {
  return notifications.sort((a, b) => {
    // Sort by priority first (high to low)
    if (b.priority !== a.priority) {
      return b.priority - a.priority;
    }
    
    // Then by timestamp (recent first)
    const timeA = new Date(a.Timestamp).getTime();
    const timeB = new Date(b.Timestamp).getTime();
    return timeB - timeA;
  });
}

// Get top N notifications
function getTop(notifications, n = 10) {
  return notifications.slice(0, n);
}

// Display notifications
function displayNotifications(notifications) {
  console.log('\nPRIORITY NOTIFICATION INBOX - TOP 10\n');

  if (notifications.length === 0) {
    console.log('No notifications found\n');
    return;
  }

  notifications.forEach((notif, index) => {
    const level = notif.priority === 3 ? 'HIGH' : notif.priority === 2 ? 'MEDIUM' : 'LOW';
    
    console.log(`${index + 1}. [${level}] ${notif.Type}`);
    console.log(`   Message: ${notif.Message}`);
    console.log(`   Time: ${notif.Timestamp || 'N/A'}`);
  });

  console.log(`\nTotal Displayed: ${notifications.length}\n`);
}

// Main program
async function main() {
  try {
    await Log('info', 'page', 'Stage 1: Starting');
    
    // Step 1: Get notifications
    const allNotifications = await fetchNotifications();
    
    // Step 2: Add priority to each
    const withPriority = addPriority(allNotifications);
    
    // Step 3: Sort by priority
    const sorted = sortByPriority(withPriority);
    
    // Step 4: Get top 10
    const topTen = getTop(sorted, 10);
    
    // Step 5: Display them
    displayNotifications(topTen);
    
    // Step 6: Log success
    await Log('info', 'page', 'Stage 1: Done');
    
  } catch (error) {
    await Log('fatal', 'page', `Error occurred`);
    process.exit(1);
  }
}

