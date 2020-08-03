const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/JobsDB', {useNewUrlParser:true}, (err) =>{
    if (!err) {console.log('MongoDB connection Succeed.')}
    else { console.log('Error in DB connection' = err) }
});
