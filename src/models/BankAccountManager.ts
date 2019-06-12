import { dbManager } from './DBManager'
import { BalanceInfo } from '../global/utils';

interface BankAccountInfo {
  id: string,
  user: string,
  balance: number,
}

export class BankAccountManager {
  public user: string
  constructor(user: string) {
    this.user = user
  }

  private getList() {
    return dbManager.connectAndUseDBObject<BankAccountInfo[]>((dbo) => new Promise((resolve, reject) => {
      const groups = dbo.collection('bank_accounts')
      const query = { user: this.user }
      groups.find(query).toArray((err, result) => {
        if (err) {
          reject(err)
          return
        }
        resolve(result)
      })
    }))
  }

  public getBalance() {
    return new Promise<BalanceInfo>((resolve) => {
      this.getList()
        .then((list) => {
          const sum = list.reduce((prev, current) => prev + current.balance, 0)
          resolve({
            balance: sum
          })
        })
    })
  }

  public sendDollarsToUser(amount: number) {
    return dbManager.connectAndUseDBObject((dbo) => new Promise<void>((resolve, reject) => {
      const account = dbo.collection('bank_accounts')
      account.updateOne(
        { user: this.user },
        { $inc: { balance: amount } }
      )
      .then(() => resolve())
      .catch((err) => reject(err))
    }))
  }
}

export function createFromUser(user: string) {
  return new BankAccountManager(user)
}
