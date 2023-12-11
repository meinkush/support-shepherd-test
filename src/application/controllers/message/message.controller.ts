import { Body, Controller, Get, NotFoundException, Param, Post, UsePipes } from '@nestjs/common';
import { CreateMessageDto, CreateMessageSchema } from './dto/create-message.dto';
import { TemporalService } from '../../services/temporal/temporal.service';
import { CreateMessageValidatorPipe } from './pipes/create-message-validator.pipe'

@Controller('/message')
export class MessageController {
  constructor(private readonly temporalService: TemporalService) {}

  @Post()
  create(@Body(CreateMessageValidatorPipe) createMessageDto: CreateMessageDto) {
    return this.temporalService.createMessage(createMessageDto)
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.temporalService.findOne(id)
  }
}
