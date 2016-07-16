var todos = require('../reducers/todos');
var filter = require('../reducers/filter');
var createStore = require('redux').createStore;
var combineReducers = require('redux').combineReducers;
var applyMiddleware = require('redux').applyMiddleware;
var thunkMiddleware = require('redux-thunk').default;
var reduxLogger = require('redux-logger');

var todosApp = combineReducers({filter: filter, todos: todos});

module.exports = function (initialState) {
    var store = createStore( todosApp,initialState||{}, applyMiddleware(thunkMiddleware, reduxLogger()));
    return store;
};