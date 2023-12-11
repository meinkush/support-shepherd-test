import { MessageRepository } from "../../../infrastructure/db/message/message.repository"
import { getKeypair } from "../../../infrastructure/secret-manager/keypair";
import { sign } from "tweetnacl";
import { decodeUTF8 } from "tweetnacl-util";

export async function addSignature(id: string) {

    const messageRepository = await MessageRepository.initRepo()

    const message = await messageRepository.findById(id)
    
    if (!message) throw new Error('Message not found on database')

    const keypair = await getKeypair();
    const messageBytes = decodeUTF8(message.message);
    const signature = sign.detached(messageBytes, keypair.secretKey);
    const signatureBase64 = Buffer.from(signature).toString("base64");
    message.signature = signatureBase64
    await messageRepository.addSignature(id, signatureBase64)
    await messageRepository.close()
}

