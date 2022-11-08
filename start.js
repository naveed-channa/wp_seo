require('dotenv').config();


// require('./models/Registration');
const app = require('./app');

const { PORT=3000, LOCAL_ADDRESS='0.0.0.0' } = process.env
server.listen(PORT, LOCAL_ADDRESS, () => {
  const address = server.address();
  console.log('server listening at..', address);
});
