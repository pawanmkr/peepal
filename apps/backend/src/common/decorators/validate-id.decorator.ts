import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';
import { UUID } from 'node:crypto';
import { validate } from 'uuid';

export const ValidateParam = createParamDecorator((param: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    // Check if the parameter is in path params
    const pathParam = request.params[param];
    if (pathParam && typeof pathParam === 'string' && validate(pathParam)) {
        return pathParam as UUID;
    }

    // Check if the parameter is in query params
    const queryParam = request.query[param];
    if (queryParam && typeof queryParam === 'string' && validate(queryParam)) {
        return queryParam as UUID;
    }

    // If neither is valid
    throw new BadRequestException(`Invalid parameter "${param}": must be a valid UUID`);
});
