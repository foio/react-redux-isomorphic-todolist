'use strict';
var createStore = require('../../public/js/logic/stores/todos');
var todoActions = require('../../public/js/logic/actions/TodoActions');
var React = require('react');
var Provider = require("react-redux").Provider;
var TodoApp = require('../../public/js/ui/containers/TodoApp');
exports.render = function (req, res, next) {
    var store = createStore();
    //init data
    store.dispatch(todoActions.loadInitTodos()).then(function () {
        var contentHtml = React.renderToString(
            <Provider store={store}>
                {function () {
                    return <TodoApp />;
                }}
            </Provider>
        );
        var initialState = JSON.stringify(store.getState());
        res.render('index.ejs', {contentHtml: contentHtml, initialState: initialState});
    }).catch(function(error){
        res.json({errMsg: 'internal error'})
    });
};
