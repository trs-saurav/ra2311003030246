
import axios from 'axios';

export const Log = async (level, packageW, message) => {

    const logData = {
        stack: "frontend",
        level: level.toLowerCase(),
        package: packageW.toLowerCase(),
        message: message
    };

    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_LOG_API, logData, {
            headers: { 
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        
        // Log sent successfully - show minimal output
        console.log(`[${logData.level.toUpperCase()}] ${logData.message} (ID: ${response.data.logID})`);
    } catch (error) {
        console.error("Logger failed:", error.response?.data || error.message);
    }
};