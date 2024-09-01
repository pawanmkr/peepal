import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
	constructor() { }

	@Get()
	checkHealth() {
		return { message: 'API is running' };
	}
}
