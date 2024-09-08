import { PartialType } from '@nestjs/swagger';
import { CreateFormalEducationDto } from './create-formal-education.dto';
export class UpdateFormalEducationDto extends PartialType(CreateFormalEducationDto) {}
