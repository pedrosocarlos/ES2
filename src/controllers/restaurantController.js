const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index (request, response) {
        const restaurant = await connection('restaurant').select('*');
    
        return response.json(restaurant);
    },

    async create(request, response){
        const { name, email, city, uf } = request.body;

        const id = crypto.randomBytes(3).toString('HEX');

        await connection('restaurant').insert({ id, name, email, city, uf })

        return response.json({ id });
    }
}
