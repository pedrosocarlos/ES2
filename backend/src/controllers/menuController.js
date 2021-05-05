const connection = require('../database/connection')

module.exports = {
    async index (request, response){
        const { page = 1} = request.query;

        const [count] = await connection('menu').count();
        console.log(count);

        const menu = await connection('menu')
            .join('restaurant', 'restaurant.id', '=', 'menu.rest_id') //juntar com a tabela do rest, onde os ids são iguais
            .limit(5).offset((page -1) * 5) //para apenas carregar 5 por vez
            .select(['menu.*', //o que eu quero de menu
            'restaurant.name', 'restaurant.city']);//o que eu quero de ongs

        response.header('X-Total-Count', count['count(*)']);
        return response.json(menu);
    },

    async create (request, response){
        const { title, description, value } = request.body;
        const rest_id = request.headers.authorization;

        //armazena na primeira em 'id' o que tem na primeira posiçao do vetor
        const [id] = await connection('menu').insert({ 
            title, description, value, rest_id, });

        return response.json({ id });
    },

    async delete (request, response){
        const { id } = request.params;
        const rest_id = request.headers.authorization;

        const menu = await connection('menu').where('id', id).select('rest_id').first();
        if(menu.rest_id != rest_id){
            return response.status(401).json({ error: 'operation not permitted' });
        }
        await connection('menu').where('id', id).delete();

        return response.status(204).send();
    }
}
