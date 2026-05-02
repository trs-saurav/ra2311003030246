
import axios from 'axios';

export const Log = async (level, packageW, message) => {

    const logData = {
        stack: "frontend",
        level: level.toLowerCase(),
        package: packageW.toLowerCase(),
        message: message
    };

    try {
        await axios.post(process.env.NEXT_PUBLIC_LOG_API, logData, {
            headers: { 
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Logger failed:", error.response?.data || error.message);
    }
};