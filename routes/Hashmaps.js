var express = require('express');
var router = express.Router();
var Hashmap = require('../models/Hashmap');
var Utils = require('../helpers/Utils');
router.get('/:key?', function(request,  response, next) {
    if (request.params.key){
        if (Utils.isUndefined(request.query.timestamp) || Utils.isEmpty(request.query.timestamp)) {
            Hashmap.getItemByKey(request.params.key, function(error, row){
                if (error) {
                    response.json(error);
                } else {
                    response.json(row[0]);
                }
            });
        } else {
            var convertedTimestamp = Utils.toDateObject(parseInt(request.query.timestamp));console.log(convertedTimestamp.toISOString());
            Hashmap.getItemByTimestamp(request.params.key, convertedTimestamp.toISOString(), function(error, row){
                if (error) {
                    response.json(error);
                } else {
                    response.json(row[0]);
                }
            });
        }
    } else {
        Hashmap.getAllItems(function(error, rows){
            if (error) {
                response.json(error);
            } else {
                response.json(rows);
            }    
        });
    }
});
router.post('/',function(request, response, next) {
    Hashmap.insertItem(request.body, function(error, count) {
        if (error) {
            response.json(error);
        } else {
            Hashmap.getItemById(count.insertId, function(error, row){
                if (error) {
                    response.json(error);
                } else {
                    response.json(row);
                }
            });
        }
    });
});
module.exports = router;