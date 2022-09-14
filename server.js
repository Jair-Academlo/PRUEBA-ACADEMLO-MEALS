require('colors');
const { app } = require('./app');
const { db } = require('./utils/database');

const PORT = 4700;

db.authenticate()
  .then(() => {
    console.log('Base autenticada'.magenta);
  })
  .catch(err => console.log(err));

db.sync()
  .then(() => {
    console.log('Base sincronizada'.magenta);
  })
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`.cyan);
});
