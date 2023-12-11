import { Module } from '@nestjs/common';
import { MessageController } from './application/controllers/message/message.controller';
import { TemporalService } from './application/services/temporal/temporal.service';
import { SchemaValidatorService } from './application/services/schema-validator/schema-validator.service'
import { temporalServiceFactory } from './application/services/temporal/temporal.service.factory';

@Module({
  imports: [],
  controllers: [MessageController],
  providers: [{
    provide: TemporalService,
    useFactory: temporalServiceFactory
  },
  SchemaValidatorService],
  
})
export class AppModule {}
