import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { nanoid } from 'nanoid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger('HTTP');

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, originalUrl } = request;
        // const userAgent = request.get('user-agent') || '';
        const date = new Date();
        const requestId = `rid${date.getDate()}${date.getMonth()}${date.getFullYear()}.${nanoid(8)}`;

        request.requestId = requestId;
        // Log immediately when the request is received
        // this.logger.log(`${requestId} ${method} ${originalUrl} - ${ip}`);
        response.on('finish', () => {
            const { statusCode } = response;
            // const contentLength = response.get('content-length');
            this.logger.log(
                `${requestId} ${method} ${originalUrl} ${statusCode} ${statusCode == 201 ? 'CREATED' : ''}`,
            );
        });
        next();
    }
}
