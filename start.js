require('dotenv').config();


// mongoose.connect(process.env.DATABASE, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// mongoose.connection
//   .on('open', () => {
//     console.log('Mongoose connection open');
//   })
//   .on('error', (err) => {
//     console.log(`Connection error: ${err.message}`);
//   });

// require('./models/Registration');
const app = require('./app');

const port = process.env.PORT || 8000;

const server = app.listen(3001, () => {
  console.log(`Express is running on port ${port}`);
});
