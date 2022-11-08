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

const port = process.env.PORT || 3001;

app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode",port);
});
