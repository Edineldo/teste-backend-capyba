function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateBody(){
    const body = [];

    for (let i = 1; i < 20; i++) {
        for (let j = 0; j < generateRandomIntegerInRange(2, 5); j++) {
            body.push({
                model_id: parseInt(i),
                km: generateRandomIntegerInRange(100000, 200000),
                createdAt: new Date(),
                updatedAt: new Date(),
            });  
        }        
    }
    return body;
}

module.exports = generateBody;