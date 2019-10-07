const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get accounts' });
        });
});

server.get('/api/accounts/:id', (req, res) => {
    const { id } = req.params;

    db('accounts').where({ id })
        .then(accountsID => {
            res.status(200).json(accountsID);
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to get accounts ID' });
        });
});

server.post('/api/accounts', (req, res) => {
    const accountData = req.body;

    db('accounts')
        .insert(accountData, 'id')
        .then(ids => {
            res.status(200).json(ids);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

server.post('/api/accounts')

module.exports = server;