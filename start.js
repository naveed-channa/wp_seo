require('dotenv').config();


// require('./models/Registration');
const app = require('./app');

var port_number = server.listen(process.env.PORT || 3000);


const server = app.listen(port_number, () => {
  console.log(`Express is running on port ${port}`);
});
