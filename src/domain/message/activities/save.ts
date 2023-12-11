import { MessageRepository } from "../../../infrastructure/db/message/message.repository"

export async function save(id: string, message: string) {

    const messageRepository = await MessageRepository.initRepo()

    const result = await messageRepository.saveNewMessage(id, message)

    await messageRepository.close()

    return result
}
