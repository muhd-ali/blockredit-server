import { CreditType } from '../global/utils'
import { createFromUser as cryptoAccountManagerForUser, CryptoAccountManager } from './CryptoAccountManager';
import { createFromUser as bankAccountManagerForUser, BankAccountManager } from './BankAccountManager';

export interface ExchangeRateInfo {
  valueof1Coin: number
}

export const valueof1Coin = 581.139
export function getExchangeRate() : ExchangeRateInfo {
  return {
    'valueof1Coin': valueof1Coin
  }
}


class ExchangeManager {
  private bankAddress: string = 'RG5BUGbxWcQQHMpUovZ2vdskwK4X5rc6YK'
  private komodoDirPath = '/media/muhammadali/local_disk_2/Linux/blockchain/komodo/src'
  private bankAccountManager: BankAccountManager
  private cryptoAccountManager: CryptoAccountManager
  public user: string
  constructor(user: string) {
    this.user = user
    this.bankAccountManager = bankAccountManagerForUser(this.user)
    this.cryptoAccountManager = cryptoAccountManagerForUser(this.user)
  }

  public dollarsToCoins(amount: number) {
    return amount / valueof1Coin
  }

  public coinsToDollars(amount: number) {
    return amount * valueof1Coin
  }

  public coin2Cash(amount: number, creditType: CreditType) {    
    let amountInCoins = amount
    if (creditType == 'dollars') {
      amountInCoins = this.dollarsToCoins(amount)
    }
    return new Promise<void>((resolve, reject) => {
      this.cryptoAccountManager.sendCoinsToBank(amountInCoins)
        .then(() => {
          let amountInDollars = amount
          if (creditType == 'coins') {
            amountInDollars = this.coinsToDollars(amount)
          }
          this.bankAccountManager.sendDollarsToUser(amountInDollars)
            .then(() => resolve())
            .catch(err => reject(err))
        })
    })
  }
}

export function createFromUser(user: string) {
  return new ExchangeManager(user)
}
