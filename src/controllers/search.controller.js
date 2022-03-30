const SearchService = require('../services/search.service');

async function getRentableCars(req, res){
    try{
        const {
            search, type, restricted, page, perPage,
        } = req.query;
        const { user_id } = res.locals;
        console.log("teste");
        //console.log(search);
        let querySearch;
        if (search) querySearch = search.charAt(0).toUpperCase() + search.slice(1)



        const rentCars = await SearchService.getCars(type, restricted, search, page, perPage);
        if (!rentCars.count === 0) return res.status(400).json({ message: "Nenhum modelo encontrado" });
        return res.status(201).json(rentCars);
    }catch(e){
        console.log(e);
        res.status(500).json({ message: "Erro desconhecido ao listar carros", e });

    }
}

module.exports = {
    getRentableCars,
}