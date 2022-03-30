
const nomes = new Array("João", "José", "Manoel", "Nattan", "Tarcisio", "Felipe",
"Gabriel", "Wesley", "Vitor");

const sobrenomes = new Array("Gomes", "Silva", "Bandeira", "Amorim",
"Diniz", "Fernandes");

function generateBody(){
const body = [];

for (let i = 0; i < nomes.length; i++) {
    const nome = nomes[i];
    for (let j = 0; j < sobrenomes.length; j++) {
        const sobrenome = sobrenomes[j];
        body.push(
            {
                name: `${nome} ${sobrenome}`,
                email: `${nome}.${sobrenome}@email.com`,
                password: Math.random().toString(26).substring(8),
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            );
    }
}

return body;
}

module.exports = generateBody;