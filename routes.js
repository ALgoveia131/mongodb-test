  
var express = require('express'),
router = express.Router(),
itemCtrl = require('./controllers/job-controller');

router.post('/', itemCtrl.createItem); // craete an item
router.get('/', itemCtrl.getItems);// get item
router.get('/items/:_id', itemCtrl.getItem); // read item
router.delete('/items/:_id', itemCtrl.deleteItem);// delete item
router.put('/:id/update', catalog-controller.updateItem); // update item

module.exports = router;
