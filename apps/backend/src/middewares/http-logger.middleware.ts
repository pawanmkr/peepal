import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { nanoid } from 'nanoid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger('HTTP');

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, originalUrl } = request;
        const startTime = process.hrtime(); // High-resolution time
        const date = new Date();
        const requestId = `rid${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}.${nanoid(
            8
        )}`; // Month is 0-based

        request.requestId = requestId;
        // Log immediately when the request is received
        this.logger.log(`${requestId} ${method} ${originalUrl} - ${ip}`);

        response.on('finish', () => {
            const { statusCode } = response;
            const diff = process.hrtime(startTime);
            const elapsedMs = diff[0] * 1000 + diff[1] / 1e6; // Convert to milliseconds
            const elapsedSec = (elapsedMs / 1000).toFixed(2); // Convert to seconds with 2 decimal places

            this.logger.log(
                `${requestId} ${method} ${originalUrl} ${statusCode} - ` +
                    `${elapsedMs.toFixed(2)}ms (${elapsedSec}sec)`
            );
        });

        next();
    }
}
