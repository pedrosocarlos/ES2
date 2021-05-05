const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index (request, response) {
        const user = await connection('users').select('*');
    
        return response.json(user);
    },

    async create(request, response){
        const { name, email, city, uf } = request.body;

        const id = crypto.randomBytes(3).toString('HEX');

        await connection('users').insert({ id, name, email, city, uf })

        return response.json({ id });
    }
}
