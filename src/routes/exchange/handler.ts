import { Router } from 'express';
const router = Router();
import { createFromUser as exchangeManagerForUser, getExchangeRate } from '../../models/ExchangeManager';
import { CreditType } from '../../global/utils';
import { rejects } from 'assert';


router.get('/rate', (req, res) => {
  const exchangeRate = getExchangeRate(); 
  res.send(exchangeRate)
});

router.put('/user=:userID/coin2cash/amountIn=:amountIn/amount=:amount', (req, res) => {
  const userID = req.params.userID
  const creditType: CreditType = req.params.amountIn
  const amount = req.params.amount
  
  exchangeManagerForUser(userID)
  .coin2Cash(parseFloat(amount), creditType)
  .then(() => {
    res.sendStatus(200)
  })
  .catch(err => rejects(err))
})

export default router;
