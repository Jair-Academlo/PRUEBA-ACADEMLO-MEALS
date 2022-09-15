require('colors');
const { app } = require('./app');
const { db } = require('./utils/database');

//Models
const { Meal } = require('./models/meal.model');
const { Order } = require('./models/order.model');
const { Restaurant } = require('./models/restaurant.model');
const { Review } = require('./models/review.model');
const { User } = require('./models/user.model');

const PORT = 4700;

db.authenticate()
  .then(() => {
    console.log('Base autenticada'.magenta);
  })
  .catch(err => console.log(err));

//relaciones

Restaurant.hasMany(Review);
Review.belongsTo(Restaurant);

Restaurant.hasMany(Meal);
Meal.belongsTo(Restaurant);

Meal.hasOne(Order);
Order.belongsTo(Meal);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

db.sync()
  .then(() => {
    console.log('Base sincronizada'.magenta);
  })
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`.cyan);
});
