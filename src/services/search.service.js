const SearchRepository = require('../repositories/search.repository');


const getCars = async(type, restricted, search = "", page = 0, perPage = 15) => {
    console.log(search);
    console.log(perPage);
    console.log(page);
    return  await SearchRepository.getCars(type, restricted, search, page, perPage);
}

module.exports = {
    getCars,
};