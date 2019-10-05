import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getUserNoteAction, deleteUserNoteAction } from '../../store/actions/';
import { Redirect } from 'react-router-dom';

import renderHTML from 'react-render-html';

import Buttons from '../../component/Buttons/Buttons';

class NotePage extends Component {
  state = {
    note: null
  }

  componentDidMount() {
    this.props.getUserNote(this.props.match.params.id, this.props.history);
  }

  render() {
    if (!this.props.userAuth) {
      return <Redirect to='/login' />
    }

    let title = null;
    let content = null;
    let noteId = null;
    if (this.props.note) {
      if (this.props.note.title) {
        title = this.props.note.title;
      }
      if (this.props.note.content) {
        content = this.props.note.content;
      }
      if (this.props.note._id) {
        noteId = this.props.note._id;
      }
    }

    return (
      <div>
        <Buttons ableToEdit={true} noteId={noteId} deleteUserNote={this.props.deleteUserNote} history={this.props.history} />
        <div>
          <h1>{title}</h1>
          { content ? renderHTML(content) : (null) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    note: state.notes.note,
    userAuth: state.auth.userIsLogin
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserNote: (noteId, history) => dispatch(getUserNoteAction(noteId, history)),

    deleteUserNote: (noteId) => {
      dispatch(deleteUserNoteAction(noteId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotePage);