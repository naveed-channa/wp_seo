require('dotenv').config();


// require('./models/Registration');
const app = require('./app');

const port = process.env.PORT || 8000;

const server = app.listen(3001, () => {
  console.log(`Express is running on port ${port}`);
});
