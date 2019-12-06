import React from 'react'
import reduxPromiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import MessagesList from './MessagesList'
import { createStore, applyMiddleware } from 'redux'
import messages from './messagesReducer'
import { Provider } from 'react-redux'

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

const INITIAL_STATE = {
    messages: [{
      id: -1,
      text: '',
      isPublic: null,
    }],
    isFulfilled: null,
    isRejected: null,
    error: null
  };

const store = createStore(
    messages,
    INITIAL_STATE,
    applyMiddleware(...middlewares));

export default function App() {
    console.log('App: store=', store);
    console.log('App: store.getState()=', store.getState());

    return (
        <Provider store={store}>
            <MessagesList />
        </Provider>
    )
}