import express from 'express';
import AccountsController from './controllers/AccountsController';

const routes = express.Router();
const accountsControllers = new AccountsController();

routes.post('/account', accountsControllers.create);
routes.put('/account/deposit', accountsControllers.deposit);
routes.put('/account/withdraw', accountsControllers.withdraw);
routes.get('/account/:id', accountsControllers.balance);
routes.delete('/account/:id', accountsControllers.delete);

export default routes;