
const picape = {
    "FIat": "Toro", 
    "Toyota": "Hillux", 
    "Nissan": "Frontier", 
    "Chevrolet": "S10", 
    "Volkswagen": "Amarok",
}

const sedan = {
        "Honda": "City",
        "Volkswagen": "Virtus",
        "Fiat": "Cronos",
        "Hyundai": "HB20S",
        "Renault": "Logan",
};

const suv = {
    "Jeep": "Renegade",
    "Hyundai": "Creta",
    "Jeep": "T-Cross",
    "Chevrolet": "Tracker",
    "Nissan": "Kicks",
};

const esportivos ={
    "Volvo": "S60 T4",
    "BMW": "320i Spon",
    "Audi": "A3 Sportback",
    "Ford": "Mustang",
    "Renault": "Sandero",
}

function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function generateBody(){
    const body = [];
  
    const picapeBrands = Object.keys(picape);
    const picapeModels = Object.values(picape);
  
    picapeBrands.map((brand, index) => {
      body.push({
        model: picapeModels[index],
        brand: brand,
        type: "picape",
        fee: generateRandomIntegerInRange(250, 400) - 0.1,
        restrict: index === 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    });
  
    const sedanBrands = Object.keys(sedan);
    const sedanModels = Object.values(sedan);
  
    sedanBrands.map((brand, index) => {
      body.push({
        model: sedanModels[index],
        brand: brand,
        type: "sedan",
        fee: generateRandomIntegerInRange(200, 350) - 0.1,
        restrict: index === 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    });
  
    const suvBrands = Object.keys(suv);
    const suvModels = Object.values(suv);
  
    suvBrands.map((brand, index) => {
      body.push({
        model: suvModels[index],
        brand: brand,
        type: "suv",
        fee: generateRandomIntegerInRange(300, 400) - 0.1,
        restrict: index === 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    });
  
    const esportBrands = Object.keys(esportivos);
    const esportModels = Object.values(esportivos);
  
    esportBrands.map((brand, index) => {
      body.push({
        model: esportModels[index],
        brand: brand,
        type: "sport",
        fee: generateRandomIntegerInRange(750, 1000) - 0.1,
        restrict: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    });
  
    return body;
  }

module.exports = generateBody;