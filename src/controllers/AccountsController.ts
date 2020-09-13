import { Request, Response } from 'express';

import db from '../database/connection';

export default class AccountsController {

    async create(request: Request, response: Response) {
        const { name, balance } = request.body;
        
        await db('accounts').insert({
            name,
            balance
        });

        return response.status(201).send();
    }

    async deposit(request: Request, response: Response) {
        const { id, value } = request.body;
        
        const exists = await db('accounts').select('*')
            .where('id', id);

        if (exists.length == 0) {
            return response.status(404).json({
                'error': 'The account was not found!'
            });
        }

        const newBalance = exists[0].balance + value;  

        await db('accounts')
            .where('id', id)
            .update('balance', newBalance);

        return response.status(201).send();
    }

    async withdraw(request: Request, response: Response) {
        const { id, value } = request.body;
        
        const exists = await db('accounts').select('*')
            .where('id', id);

        if (exists.length == 0) {
            return response.status(404).json({
                'error': 'The account was not found!'
            });
        }

        if (exists[0].balance < value) {
            return response.status(403).json({
                'error': 'The withdraw value is bigger than your balance!'
            });
        }

        const newBalance = exists[0].balance - value;  

        await db('accounts')
            .where('id', id)
            .update('balance', newBalance);

        return response.status(201).send();
    }

    async balance(request: Request, response: Response) {
        const { id } = request.params;
        
        const exists = await db('accounts').select('balance')
            .where('id', id);

        if (exists.length == 0) {
            return response.status(404).json({
                'error': 'The account was not found!'
            });
        }

        return response.status(201).send(exists[0]);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        
        const exists = await db('accounts').select('id')
            .where('id', id)
            .del();

        if (exists == 0) {
            return response.status(404).json({
                'error': 'The account was not found!'
            });
        }

        return response.status(201).send();
    }
}