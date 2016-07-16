var React = require('react');
var PropTypes = React.PropTypes;
var classnames = require('classnames');
var TodoTextInput = require('./TodoTextInput');

var TodoItem = React.createClass({
  propTypes: {
    todo: PropTypes.object.isRequired,
    putMarkTodo: PropTypes.func.isRequired,
    putEditTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    markTodo: PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      editing: false
    };
  },

  handleDoubleClick: function() {
    this.setState({ editing: true });
  },

  handleSave: function(id, marked,text) {
    if (text.length === 0) {
      this.props.removeTodo(id);
    } else {
      this.props.putEditTodo(id, text, marked);
    }
    this.setState({ editing: false });
  },

  render: function() {
    var todo = this.props.todo;
    var putMarkTodo = this.props.putMarkTodo;
    var removeTodo = this.props.removeTodo;

    var element;
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
                       editing={this.state.editing}
                       onSave={this.handleSave.bind(this, todo.id, todo.marked)} />
      );
    } else {
      element = (
        <div className='view'>
          <input className='toggle'
                 type='checkbox'
                 checked={todo.marked}
                 onChange={putMarkTodo.bind(null, todo.id, todo.text ,!todo.marked)} />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <button className='destroy'
                  onClick={removeTodo.bind(null, todo.id)} />
        </div>
      );
    }

    return (
      <li className={classnames({
        completed: todo.marked,
        editing: this.state.editing
      })}>
        {element}
      </li>
    );
  }
});

module.exports = TodoItem;
