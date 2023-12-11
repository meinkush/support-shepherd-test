// WARNING: this is not the optimal way to handle secrets 
// it is only made like this to respect structure and add the requested functionality
// content of this script should be replace with a proper way to handle the keypair
import { Keypair } from "@solana/web3.js";
import * as fs from 'fs'

const keypairFilePath = "./secretKey.json";

type secretKey = {
    secretKey: string
}

export async function getKeypair() {
    try {
        const keypairData = fs.readFileSync(keypairFilePath, "utf8");
        const parsedKeypairData: secretKey = JSON.parse(keypairData);
    
        if (typeof parsedKeypairData.secretKey !== "string") {
        throw new Error("Invalid keypair JSON format");
        }
    
        const secretKeyBytes = Buffer.from(parsedKeypairData.secretKey, "base64");
        return Keypair.fromSecretKey(secretKeyBytes);
    } catch (error) {
        throw error;
    }
      
}

export async function generateSigningKey() {

    const keypair = Keypair.generate();
    const secretKeyBytes = keypair.secretKey;
    const secretKeyBase64 = Buffer.from(secretKeyBytes).toString("base64");
    const keypairData: secretKey = {
      secretKey: secretKeyBase64,
    };
    const jsonString = JSON.stringify(keypairData);
    
    try {
      fs.writeFileSync(keypairFilePath, jsonString, "utf8");
    } catch (error) {
      throw error;
    }
    
}
