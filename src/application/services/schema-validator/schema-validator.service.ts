import { Injectable } from '@nestjs/common';
import Ajv, { AnySchema } from 'ajv';
import ajvFormats from 'ajv-formats';
import schemas from './schemas'

type ValidationResult = { 
    valid: boolean | Promise<unknown>,
    errors: (string | undefined)[] | undefined
}

@Injectable()
export class SchemaValidatorService {
    private readonly ajv: Ajv;

    constructor() {
      this.ajv = new Ajv(
        {
            schemas
        }
      );
      ajvFormats(this.ajv, ['uuid'])
    }

    validate(value: any, schema: AnySchema): ValidationResult {
        const valid = this.ajv.validate(schema, value);
        return {
            valid,
            errors: this.ajv.errors?.map(error => error.message)
        }
    }
  
}
