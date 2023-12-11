import { Client, Connection } from "@temporalio/client";
import { TemporalService } from "./temporal.service";

export async function temporalServiceFactory() {
    // Perform any necessary asynchronous tasks
    const connection = await Connection.connect({ address: 'localhost:7233' }).catch(() => {
        throw new Error('could not start connection to temporal')
    })
    // Return the service instance
    return new TemporalService(new Client({
        connection,
    }));
  }
  