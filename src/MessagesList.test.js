import { expect } from 'chai'
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store'
import React from 'react';
import { Provider } from 'react-redux'

import ConnectedMessagesList, { MessagesList } from './MessagesList'
import {
  fetchMessages,
  addMessage} from './messagesActions'

describe('COMPONENT <MessagesList />', () => {

  const INITIAL_STATE = {
    messages: [{
      id: -1,
      text: '',
      isPublic: null,
      currentText: '',
      currentIsPublic: null,
    }],
    isFulfilled: false,
    isRejected: null,
    error: null
  };

  const mockStore = configureStore()
  let store, wrapper

  beforeEach(() => {
    store = mockStore(INITIAL_STATE)
    wrapper = mount(<Provider store={store}><ConnectedMessagesList /></Provider>)
  })

  it('render the connected component', () => {
    expect(wrapper.find(ConnectedMessagesList).length).to.equal(1)
  });

  it('check Prop matches with initialState messages', () => {
    expect(wrapper.find(MessagesList).prop('messages')).to.equal(INITIAL_STATE.messages)
  });

  it('check Prop matches with initialState isFulfilled', () => {
    expect(wrapper.find(MessagesList).prop('isFulfilled')).to.equal(INITIAL_STATE.isFulfilled)
  });

  it('check Prop matches with initialState isRejected', () => {
    expect(wrapper.find(MessagesList).prop('isRejected')).to.equal(INITIAL_STATE.isRejected)
  });

  it('check Prop matches with initialState error', () => {
    expect(wrapper.find(MessagesList).prop('error')).to.equal(INITIAL_STATE.error)
  });

  it('check action on dispatching ', () => {
    let actions
    store.dispatch(fetchMessages())
    store.dispatch(addMessage())
    actions = store.getActions()
    console.log('actions=', actions)
    expect(actions[0].type).to.be.equal("FETCH_MESSAGES") // pending
    expect(actions[1].type).to.be.equal("FETCH_MESSAGES") // fulfilled
    expect(actions[2].type).to.be.equal("ADD_MESSAGE")
  });

})
