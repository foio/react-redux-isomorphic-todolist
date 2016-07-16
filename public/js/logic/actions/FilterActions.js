var types = require('../constants/ActionTypes');

module.exports.setFilter = function setFilter(filter){
    return {
        type: types.SET_VISIBILITY_FILTER,
        filter: filter
    };
}