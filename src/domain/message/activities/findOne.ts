import { MessageRepository } from "../../../infrastructure/db/message/message.repository"

export async function findOne(id: string) {

    const messageRepository = await MessageRepository.initRepo()
    const message = await messageRepository.findById(id)
    await messageRepository.close()
    return message
}