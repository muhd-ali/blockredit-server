import util from 'util';
import { exec } from 'child_process';
export const executeCommand = util.promisify(exec);

export type CreditType = 'dollars' | 'coins'
export interface BalanceInfo {
    balance: number
}
