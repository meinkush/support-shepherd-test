import { Entity, PrimaryColumn, Column } from "typeorm";

export const MAX_MESSAGE_LENGTH = 65515

export enum Status {
  PENDING_SIGNATURE = "PENDING_SIGNATURE",
  DENIED = "DENIED",
  SIGNED = "SIGNED"
}

@Entity()
export class MessageEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar", { length: MAX_MESSAGE_LENGTH })
  message: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  signature: string;

  @Column({ type: "varchar", enum: Status })
  status: Status;
}