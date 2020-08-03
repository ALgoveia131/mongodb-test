const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Jobs = mongoose.model('Jobs');

router.get('/', (req, res) => {
    res.json ('jobs/addOrEdit', {
    viewTitle: "Insert Jobs"
 });
 });

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var job = new Jobs();
    job. = req.body.jobTitle;
    job.jobDescription = req.body.jobDescription;
    job.jobKeywords = req.body.jobKeywords;
    job.jobLocation = req.body.jobLocation;
    job.save((err, doc) => {
        if (!err)
            res.redirect('jobs/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("jobs/addOrEdit", {
                    viewTitle: "Insert Job",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Jobs.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('jobs/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("jobs/addOrEdit", {
                    viewTitle: 'Update jobs',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("jobs/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving jobs list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'jobTitle':
                body['TitleError'] = err.errors[field].message;
                break;
            case 'jobLocation':
                body['locationError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("jobs/addOrEdit", {
                viewTitle: "Update jobs",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/jobs/list');
        }
        else { console.log('Error in job delete :' + err); }
    });
});

 module.exports = router;