import React from 'react'
import ReactDOM from 'react-dom'
import reduxPromiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import App from './App'
import { createStore, applyMiddleware } from 'redux'
import messages from './messagesReducer'
import { Provider } from 'react-redux'
import { MESSAGES_API } from './messagesApi'

// Temporary solution for 'Warning: A component is contentEditable and contains children managed by React'
// => A way to disable contenteditable warnings #5837 : https://github.com/facebook/react/issues/5837
console.error = (function () {
  var error = console.error
  return function (exception) {
    if ((exception + '').indexOf('Warning: A component is `contentEditable`') !== 0) {
      error.apply(console, arguments)
    }
  }
})()

const middlewares = [
  // Given a single action with an async payload, the middleware transforms 
  // the action to a separate pending action and a separate fulfilled/rejected action, 
  // representing the states of the async action.
  reduxPromiseMiddleware,

  // Redux Thunk middleware allows you to write action creators that return a function instead of an action.
  thunk,
];

// fetch data messages
MESSAGES_API.fetchMessages().then((messagesList) => {

  // init currentText & currentIsPublic with data messages
  let _messagesList = [];
  messagesList.forEach((msg) => {
    _messagesList.push({
      id: msg.id,
      text: msg.text,
      isPublic: msg.isPublic,
      currentText: msg.text,
      currentIsPublic: msg.isPublic,
      isEdit: false
    })
  })
  console.log('App/index: _messagesList=', _messagesList);

  // init store with data messages
  const store = createStore(
    messages,
    { messages: _messagesList },
    applyMiddleware(...middlewares));

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'));
});



