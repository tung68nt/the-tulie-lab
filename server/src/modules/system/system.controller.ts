import { Request, Response } from 'express';
import os from 'os';

export const getSystemStats = async (req: Request, res: Response) => {
    try {
        const uptime = process.uptime();
        const memoryUsage = process.memoryUsage();
        const osInfo = {
            platform: os.platform(),
            release: os.release(),
            totalMem: os.totalmem(),
            freeMem: os.freemem(),
            cpus: os.cpus().length,
        };

        res.json({
            uptime, // in seconds
            memory: {
                rss: memoryUsage.rss,       // Resident Set Size
                heapTotal: memoryUsage.heapTotal,
                heapUsed: memoryUsage.heapUsed,
                external: memoryUsage.external,
            },
            os: osInfo,
            nodeVersion: process.version,
            serverTime: new Date().toISOString(),
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
