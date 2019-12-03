import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addMessage as _addMessage,
  setCurrentText as _setCurrentText,
  setCurrentIsPublic as _setCurrentIsPublic,
  deleteMessage as _deleteMessage,
  saveMessage as _saveMessage
} from './messagesActions';

class Message extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    if (!this.props.text) {
      this.textInput.current.focus();
    }
  }

  render() {
    console.log('Message/render: this.props=', this.props);
    const { id, text, isPublic, currentText, currentIsPublic, isEdit } = this.props;

    return (
      <tr key={this.props.index}>
        <td
          className="text-left"
          data-input-length="70"
          contentEditable="true"
          ref={this.textInput}
          onInput={e => this.props.setCurrentText(id, e.currentTarget.textContent)}>
          {text}
        </td>
        <td>
          <input
            className="form-check-input"
            type="checkbox"
            checked={currentIsPublic}
            onChange={e => this.props.setCurrentIsPublic(id, e.target.checked)}
          />
        </td>
        <td>
          {isEdit && <i
            className="fas fa-save"
            onClick={() => this.props.saveMessage({
              id,
              text,
              isPublic,
              currentText,
              currentIsPublic
            })}></i>}
        </td>
        <td><i className="fas fa-trash" onClick={() => this.props.deleteMessage(id)}></i></td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addMessage: () => dispatch(_addMessage()),
  setCurrentText: (id, text) => dispatch(_setCurrentText(id, text)),
  setCurrentIsPublic: (id, isPublic) => dispatch(_setCurrentIsPublic(id, isPublic)),
  deleteMessage: (id) => dispatch(_deleteMessage(id)),
  saveMessage: (message) => dispatch(_saveMessage(message)),
});

export default connect(
  null,
  mapDispatchToProps
)(Message);