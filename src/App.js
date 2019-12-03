import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import { addMessage as _addMessage } from './messagesActions';

class App extends Component {
  render() {
    console.log('App/render: this.props=', this.props);
    const { messages } = this.props;
    if (!messages) {
      return (
        <b>Chargement...</b>
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
                    <th className="text-left" style={{width: '70%'}}>Message</th>
                    <th style={{width: '20%'}}>Public</th>
                    <th style={{width: '5%'}}> </th>
                    <th style={{width: '5%'}}> </th>
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
  };
}

const mapDispatchToProps = (dispatch) => ({
  addMessage: () => dispatch(_addMessage()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);