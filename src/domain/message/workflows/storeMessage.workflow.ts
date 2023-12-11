import * as workflow from '@temporalio/workflow';
import type * as activities from '../activities';  

const { save, addSignature } = workflow.proxyActivities<typeof activities>({  
 startToCloseTimeout: '10 seconds',  
});

export async function storeMessage(id: string, message: string) {

    await save(id, message)

    await addSignature(id)

}
