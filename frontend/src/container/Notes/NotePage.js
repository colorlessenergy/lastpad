import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import { getUserNoteAction } from '../../store/actions/';

import renderHTML from 'react-render-html';

class NotePage extends Component {
  state = {
    note: null
  }

  componentDidMount() {
    this.props.getUserNote(this.props.match.params.id, this.props.history);
  }

  render() {
    // soon this would not work when adding react quill
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

    console.log(content);

    return (
      <div>
        <p>Here is your note:</p>
        <div>
          <h1>{title}</h1>
          { content ? renderHTML(content) : (null) }
        </div>
        <div>
          <Link to={'/note/edit/' + noteId}>
            Edit
          </Link>
          <Link to={'/note/' + noteId}>
            View
          </Link>
          <Link to={'/note/delete/' + noteId}>
            Delete
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    note: state.notes.note
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserNote: (noteId, history) => dispatch(getUserNoteAction(noteId, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotePage);