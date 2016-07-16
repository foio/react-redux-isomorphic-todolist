var React = require('react');
var PropTypes = React.PropTypes;
var TodoTextInput =require('./TodoTextInput');

var Header = React.createClass({
  propTypes: {
    postTodo: PropTypes.func.isRequired
  },

  handleSave: function(text) {
    if (text.length !== 0) {
      this.props.postTodo(text);
    }
  },

  render: function() {
    return (
      <header className='header'>
          <h1>todos</h1>
          <TodoTextInput newTodo={true}
                         onSave={this.handleSave}
                         placeholder='What needs to be done?' />
      </header>
    );
  }
});

module.exports = Header;
