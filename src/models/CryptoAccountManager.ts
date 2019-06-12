import { dbManager } from './DBManager'
import { executeCommand, BalanceInfo } from '../global/utils'

interface addressInfo {
  address: string
  balance: number
}

export class CryptoAccountManager {
  private bankAddress: string = 'RG5BUGbxWcQQHMpUovZ2vdskwK4X5rc6YK'
  private komodoDirPath = '/media/muhammadali/local_disk_2/Linux/blockchain/komodo/src'
  private commandPrefix = `${this.komodoDirPath}/komodo-cli -ac_name=VENOMCHAIN`
  public user: string
  constructor(user: string) {
    this.user = user
  }

  private getList() {
    return new Promise<addressInfo[]>((resolve, reject) => {
      executeCommand(`${this.commandPrefix} listaddressgroupings`)
        .then((result) => {
          let jsonData: any[][][] = JSON.parse(result.stdout)
          let addresses: any[][] = []
          jsonData.forEach(element => {
            addresses.push(...element)
          });          
          resolve(addresses.map((inner) => {
            return {
              'address': inner[0],
              'balance': parseFloat(inner[1]),
            }
          }))
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  public getBalance() {
    return new Promise<BalanceInfo>((resolve, reject) => {
      this.getList()
        .then((list) => {
          const sum = list.reduce((prev, current) => prev + current.balance, 0)
          
          resolve({
            'balance': sum,
          })
        })
        .catch(err => reject(err))
    })
  }

  public sendCoinsToBank(amount: number) {
    return new Promise<void>((resolve, reject) => {
      executeCommand(`${this.commandPrefix} sendtoaddress "${this.bankAddress}" ${amount.toFixed(3)}`)
        .then((result) => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export function createFromUser(user: string) {
  return new CryptoAccountManager(user)
}
