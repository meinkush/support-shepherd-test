import { BadRequestException, Injectable, PipeTransform, BadGatewayException } from '@nestjs/common';
import { SchemaValidatorService } from 'src/application/services/schema-validator/schema-validator.service';
import { CreateMessageSchema } from '../dto/create-message.dto';

@Injectable()
export class CreateMessageValidatorPipe implements PipeTransform {

  constructor(private readonly schemaValidatorService: SchemaValidatorService) {}

  transform(value: unknown) {
    const ValidationResult = this.schemaValidatorService.validate(value, CreateMessageSchema)
    if (!ValidationResult.valid) {
      throw new BadRequestException(ValidationResult.errors);
    }
    return value;
  }
}
