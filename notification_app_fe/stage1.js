import axios from 'axios';
import dotenv from 'dotenv';
import { Log } from '../logging_middleware/logger.js';


dotenv.config({ path: '.env.local' });


const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

const PRIORITY = {
  "Placement": 3,
  "Result": 2,
  "Event": 1
};

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

function addPriority(notifications) {
  return notifications.map(notif => ({
    ...notif,
    priority: PRIORITY[notif.Type] || 0
  }));
}


function sortByPriority(notifications) {
  return notifications.sort((a, b) => {

    if (b.priority !== a.priority) {
      return b.priority - a.priority;
    }
    

    const timeA = new Date(a.Timestamp).getTime();
    const timeB = new Date(b.Timestamp).getTime();
    return timeB - timeA;
  });
}


function getTop(notifications, n = 10) {
  return notifications.slice(0, n);
}

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


async function main() {
  try {
    await Log('info', 'page', 'Stage 1: Starting');

    const allNotifications = await fetchNotifications();
   
    const withPriority = addPriority(allNotifications);
   
    const sorted = sortByPriority(withPriority);
    
    
    const topTen = getTop(sorted, 10);
    
  
    displayNotifications(topTen);
    

    await Log('info', 'page', 'Stage 1: Done');
    
  } catch (error) {
    await Log('fatal', 'page', `Error occurred`);
    process.exit(1);
  }
}

main()

