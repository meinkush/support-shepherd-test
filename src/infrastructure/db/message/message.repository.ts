import { DataSource, Repository } from "typeorm";
import dataSource from "../data-source";
import { MessageEntity, Status } from "./message.entity";

export class MessageRepository {
    
    constructor (
        private readonly repository: Repository<MessageEntity>,
        private readonly source: DataSource
    ) {}

    // factory function to init connection
    static async initRepo () {
        const source = (await dataSource.initialize())
        const repository = source.getRepository(MessageEntity)
        return new MessageRepository(repository, source)
    }

    async saveNewMessage(id: string, message: string){
        return await this.repository.insert({
            id,
            message,
            status: Status.PENDING_SIGNATURE
        })
    }

    async findById(id: string) {
        return this.repository.findOneBy({ id })
    }

    async addSignature(id: string, signature: string) {
        return await this.repository.update({ id }, { signature, status: Status.SIGNED })
    }

    async close() {
        await this.source.destroy()
    }
}
