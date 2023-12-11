import 'reflect-metadata'
import { DataSource } from "typeorm";
import { MessageEntity } from "./message/message.entity";
import { uuid4 } from '@temporalio/workflow';

export default new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "temporal",
    password: "temporal",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [MessageEntity],
    subscribers: [],
    migrations: [],
    name: uuid4()
})