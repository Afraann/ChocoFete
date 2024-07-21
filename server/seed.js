const mongoose = require('mongoose');
const Item = require('./models/Item');

mongoose.connect('mongodb://localhost:27017/choco-fete', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const items = [
  {
    name: 'Dark Chocolate',
    description: 'Rich and creamy dark chocolate.',
    image: 'path/to/dark-chocolate.jpg',
    price: '$10'
  },
  {
    name: 'Milk Chocolate',
    description: 'Smooth and sweet milk chocolate.',
    image: 'path/to/milk-chocolate.jpg',
    price: '$8'
  },
  // Add more items as needed
];

const seedDatabase = async () => {
  await Item.deleteMany({});
  await Item.insertMany(items);
  console.log('Database seeded');
  mongoose.connection.close();
};

seedDatabase();
