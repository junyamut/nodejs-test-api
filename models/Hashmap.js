var ds = require('../datasource');
var Hashmap = {
    getAllItems:function(callback) {
        return ds.query('SELECT `Map`.`key`, `Map`.`value`, `Map`.`timestamp` FROM hashmap AS Map WHERE `Map`.`timestamp` IN (SELECT MAX(`Sub`.`timestamp`) FROM hashmap AS Sub GROUP BY `Sub`.`key`) ORDER BY `Map`.`key`', callback);
    },
    getItemById:function(id, callback) {
        return ds.query('SELECT `Map`.`key`, `Map`.`value`, `Map`.`timestamp` FROM hashmap AS Map WHERE Map.id=?', [id], callback);
    },    
    getItemByKey:function(key, callback) {
        return ds.query('SELECT `Map`.`value` FROM hashmap AS Map WHERE `Map`.`key`=? ORDER BY `Map`.`timestamp` DESC LIMIT 1', [key], callback);
    },
    getItemByTimestamp:function(key, timestamp, callback) {
        return ds.query('SELECT `Map`.`value` FROM hashmap AS Map WHERE `Map`.`timestamp` IN (SELECT MAX(`Sub`.`timestamp`) FROM hashmap AS Sub WHERE `Sub`.`key` =? && `Sub`.`timestamp` <=?)', [key, timestamp], callback);
    },
    insertItem:function(Item, callback) {
        var key = Object.keys(Item)[0];
        return ds.query('INSERT INTO hashmap(`key`, `value`) VALUES(?,?) ', [key, Item[key]], callback);
    }
};
module.exports = Hashmap;