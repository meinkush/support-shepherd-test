import { Inject, Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Connection, Client, WorkflowIdReusePolicy } from '@temporalio/client';
import { findMessage, storeMessage } from '../../../domain/workflows';
import { CreateMessageDto } from '../../controllers/message/dto/create-message.dto';

@Injectable()
export class TemporalService {
    constructor( private readonly temporalClient: Client) {}

    async createMessage(createMessageDto: CreateMessageDto) {

        const workflowId  =`create-message-${createMessageDto.id}`

        await this.temporalClient.workflow.start(storeMessage, {
            taskQueue: 'messages',
            args: [createMessageDto.id, createMessageDto.message],
            workflowId: workflowId,
            workflowIdReusePolicy: WorkflowIdReusePolicy.WORKFLOW_ID_REUSE_POLICY_REJECT_DUPLICATE
        })
        .catch(() => {
            throw new InternalServerErrorException(`message with id ${createMessageDto.id} could not be created`)
        })

        return { id: createMessageDto.id }
    }

    async findOne(id: string) {

        const workflowId = `find-message-${id}`

        const result = await this.temporalClient.workflow.execute(findMessage, {
            taskQueue: 'messages',
            args: [id],
            workflowId: workflowId
        })
        // handle message already being retrieved
        .catch(() => {
            throw new InternalServerErrorException(`message with id ${id} could not be fetch`)
        })
        if (!result) throw new NotFoundException(`no message with id ${id} was found`)

        return result
    }
}
