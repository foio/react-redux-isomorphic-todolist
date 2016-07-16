var types = require('../constants/ActionTypes');
var fetch = require('isomorphic-fetch');
var _ = require('lodash');

var addTodo = function (item) {
    return {
        type: types.ADD_TODO,
        item: item || {}
    };
}

var deleteTodo = function (id) {
    return {
        type: types.DELETE_TODO,
        id: id
    };
}

var editTodo = function (id, text) {
    return {
        type: types.EDIT_TODO,
        id: id,
        text: text
    };
}

var markTodo = function (id) {
    return {
        type: types.MARK_TODO,
        id: id
    };
}

var markAll = function () {
    return {
        type: types.MARK_ALL
    };
}

var clearMarked = function () {
    return {
        type: types.CLEAR_MARKED
    };
}

var initTodos = function (items) {
    return {
        type: types.INIT_TODOS,
        items: items,
    }
}

function loadingTodos() {
    return {
        type: types.LOADING_TODOS
    }
}

function successLoadedTodos() {
    return {
        type: types.LOADED_TODOS_SUCCESS
    }
}

function failLoadedTodos() {
    return {
        type: types.LOADED_TODOS_FAILED
    }
}


function loadInitTodos() {
    return function (dispatch) {
        return fetch('http://localhost:3000/todos')
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                dispatch(initTodos(json.data || []));
            })
    }
}

var fetchTodos = function () {
    return function (dispatch) {
        dispatch(loadingTodos());
        return fetch('/todos')
            .then(function (response) {
                dispatch(successLoadedTodos());
                return response.json();
            }).then(function (json) {
                dispatch(initTodos(json.data || []));
            }).catch(function () {
                dispatch(failLoadedTodos());
            });
    }
}

var postTodo = function (text) {
    return function (dispatch) {
        dispatch(loadingTodos());
        return fetch('/todos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
            })
        }).then(function (response) {
            dispatch(successLoadedTodos());
            return response.json();
        }).then(function (json) {
            dispatch(addTodo(json.data || {}));
        }).catch(function () {
            dispatch(failLoadedTodos());
        });
    }
}


var putTodo = function (actionType,postId,text,marked) {
    return function (dispatch) {
        dispatch(loadingTodos());
        return fetch('/todos/'+postId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                marked: marked
            })
        }).then(function (response) {
            dispatch(successLoadedTodos());
            return response.json();
        }).then(function (json) {
            if(actionType == 'mark') {
                dispatch(markTodo(postId));
            }else if(actionType == 'edit'){
                dispatch(editTodo(postId,text));
            }
        }).catch(function () {
            dispatch(failLoadedTodos());
        });
    }
}


var removeTodo = function (postId) {
    return function (dispatch) {
        dispatch(loadingTodos());
        return fetch('/todos/'+postId, {
            method: 'DELETE',
        }).then(function (response) {
            dispatch(successLoadedTodos());
            return response.json();
        }).then(function (json) {
            dispatch(deleteTodo(postId));
        }).catch(function () {
            dispatch(failLoadedTodos());
        });
    }
}


var putMarkAll = function(marked){
    return function (dispatch) {
        dispatch(loadingTodos());
        return fetch('/todos', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                marked: marked
            })
        }).then(function (response) {
            dispatch(successLoadedTodos());
            return response.json();
        }).then(function (json) {
            dispatch(markAll());
        }).catch(function () {
            dispatch(failLoadedTodos());
        });
    }
}


module.exports.loadInitTodos = loadInitTodos;
module.exports.fetchTodos = fetchTodos;
module.exports.postTodo = postTodo;
module.exports.putMarkTodo = _.curry(putTodo)('mark');
module.exports.putEditTodo = _.curry(putTodo)('edit');
module.exports.putMarkAll = putMarkAll;
module.exports.removeTodo = removeTodo;
module.exports.addTodo = addTodo;
module.exports.deleteTodo = deleteTodo;
module.exports.editTodo = editTodo;
module.exports.markTodo = markTodo;
module.exports.markAll = markAll;
module.exports.clearMarked = clearMarked;
module.exports.initTodos = initTodos;