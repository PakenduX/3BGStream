const faker = require('faker');

const database = {
  users: [],
  playlists: [],
  videos: []

}

for (let i = 1; i<= 10; i++) {
  database.users.push({
    _id: i,
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(),
    price: faker.commerce.price(),
    imageUrl: "https://source.unsplash.com/1600x900/?product",
    quantity: faker.random.number()
  });
}

console.log(JSON.stringify(database));
