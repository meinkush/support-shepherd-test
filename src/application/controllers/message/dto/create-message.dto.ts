import {JSONSchemaType} from "ajv"
import { MAX_MESSAGE_LENGTH } from "../../../../infrastructure/db/message/message.entity";

export class CreateMessageDto {
    id: string
    message: string
}

export const CreateMessageSchema: JSONSchemaType<CreateMessageDto> = {
    type: "object",
    properties: {
      id :{ type: "string", format: "uuid", maxLength: MAX_MESSAGE_LENGTH},
      message: { type: "string" }
    },
    required: ["id", "message"],
    additionalProperties: false
};