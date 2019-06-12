import { Router } from 'express';
const router = Router();
import { createFromUser as bankAccountManagerForUser } from '../../models/BankAccountManager';


router.get('/user=:userID/balance', (req, res) => {
  const userID = req.params.userID;
  bankAccountManagerForUser(userID)
  .getBalance()
  .then((balance) => {
    res.send(balance)
  })
  .catch(() => {
    res.sendStatus(401);
  })
});

export default router;
