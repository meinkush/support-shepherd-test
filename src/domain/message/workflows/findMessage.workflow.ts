import * as workflow from '@temporalio/workflow';  
import type * as activities from '../activities';  

const { findOne } = workflow.proxyActivities<typeof activities>({  
 startToCloseTimeout: '10 seconds',
});  

export async function findMessage(id: string) {  
 return await findOne(id);
}