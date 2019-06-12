import { Router } from 'express';
const router = Router();
import { createFromUser as cryptoAccountManagerForUser } from '../../models/CryptoAccountManager';

router.get('/user=:userID/balance', (req, res) => {
  const userID = req.params.userID;
  cryptoAccountManagerForUser(userID)
  .getBalance()
  .then((list) => {   
    res.send(list)
  })
  .catch(() => {
    res.sendStatus(401);
  })
});

export default router;
