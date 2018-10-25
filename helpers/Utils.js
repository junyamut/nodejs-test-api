var Utils = {    
    isUndefined: function(variable) {
        return (typeof variable === 'undefined') ? true : false;
    },
    isEmpty: function(variable) {
        return (variable.trim().length === 0) ? true : false;
    },
    toDateObject: function(timestamp) {
        return new Date(timestamp * 1000);
    }
};
module.exports = Utils;