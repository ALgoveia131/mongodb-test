const mongoose  =  require('mongoose');

var jobsSchema = new mongoose.Schema({
    jobTitle:{
        type:String
    },
    jobDescription:{
        type:String
    },
    jobKeywords:{
        type:String
    },
    jobLocation:{
        type:String
    }
});

mongoose.model('Jobs', jobsSchema);
