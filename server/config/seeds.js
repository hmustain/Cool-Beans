const db = require('./connection');
const { User } = require('../models');

const userSeedData = [
    {
        firstName: 'Caleb',
        lastName: 'Carnett',
        email: 'caleb@example.com',
        password: 'Password12345!',
        role: 'admin'
    },
]