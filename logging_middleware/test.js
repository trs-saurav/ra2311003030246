import { Log } from './logger.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

console.log('Testing logger...\n');

await Log('info', 'page', 'Test message 1');
await Log('warn', 'page', 'Test message 2');
await Log('error', 'page', 'Test message 3');

console.log('\nTest complete');
