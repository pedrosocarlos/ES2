const connection = require('../database/connection')

module.exports = {
    async index(request, response){
        const menu = await connection('menu').select('*');

        return response.json(menu);
    }
}
