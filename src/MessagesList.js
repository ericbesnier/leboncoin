import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import {
  addMessage as _addMessage,
  fetchMessages as _fetchMessages,
} from './messagesActions';

function Spinner() {
  return (
    <div className="container-fluid">
      <div className="card">
        <h3 className="card-header text-center font-weight-bold text-uppercase py-4">LEBONCOIN
      </h3>
        <div className="d-flex justify-content-center">
        </div>
        <div className="d-flex justify-content-center">
          <div className="card-body">
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="card-body">
                Chargement des messages... simulation
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
class MessagesList extends Component {
  constructor(props) {
    super(props);
    console.log('MessagesList/render: this.props=', this.props);

    this.props.fetchMessages();
  }

  render() {
    console.log('MessagesList/render: this.props=', this.props);
    const { messages, isFulfilled } = this.props;
    if (!isFulfilled) {
      return (
        <Spinner />
      );
    }
    const messageList = messages.map((msg) => (
      <Message
        key={msg.id}
        id={msg.id}
        text={msg.text}
        isPublic={msg.isPublic}
        currentText={msg.currentText}
        currentIsPublic={msg.currentIsPublic}
        isEdit={msg.isEdit}
      />
    ));

    return (
      <div className="container-fluid">
        <div className="card">
          <h3 className="card-header text-center font-weight-bold text-uppercase py-4">leboncoin</h3>
          <div className="card-body">
            <div id="table" className="table-editable">
              <table className="table table-responsive-md table-striped text-center">
                <thead>
                  <tr>
                    <th className="text-left" style={{ width: '70%' }}>Message</th>
                    <th style={{ width: '20%' }}>Public</th>
                    <th style={{ width: '5%' }}> </th>
                    <th style={{ width: '5%' }}> </th>
                  </tr>
                </thead>
                <tbody>
                  {messageList}
                </tbody>
              </table>
              <span className="table-add float-left mb-3 mr-2">
                <span>
                  <button
                    type="button"
                    className="btn btn-danger btn-rounded btn-sm my-0"
                    onClick={() => this.props.addMessage()}>
                    +
                  </button>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    isFulfilled: state.isFulfilled,
    isRejected: state.isRejected,
    error: state.error
  };
}

const mapDispatchToProps = (dispatch) => ({
  addMessage: () => dispatch(_addMessage()),
  fetchMessages: () => dispatch(_fetchMessages()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesList);