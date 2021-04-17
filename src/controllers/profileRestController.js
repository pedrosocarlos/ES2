const connection = require('../database/connection')

module.exports = {
    async index(request, response){
        const rest_id = request.headers.authorization;

        const menu = await connection('menu').where('rest_id', rest_id).select('*');

        return response.json(menu);
    }
}
