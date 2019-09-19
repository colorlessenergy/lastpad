import React, { Component } from 'react';

import { connect } from 'react-redux';

import { getUserNoteAction, updateUserNoteAction } from '../../../store/actions/note';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class UpdateNote extends Component {

  state = {
    title: '',
    content: '',
    id: '',
    // this property is used to fill the form
    // on the initial load
    dataFilled: false,
    error: false
  }

  // config for react quill

  modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
      ['code-block']
    ]
  };

  formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'code-block'
  ];

  handleChange = (ev) => {
    this.setState({
      [ev.target.id]: ev.target.value
    });
  }

  /**
   * updates the state of the content with the rich text editor
   * 
   *  @param {String} content - rich text editor content
   */

  onQuillChange = (content) => {

    this.setState({
      content: content
    });
  }

  handleSubmit = (ev) => {
    ev.preventDefault();


    let errorMessage = '';

    if (!this.state.title) {
      errorMessage += 'missing a title';
    }

    if (!errorMessage) {
      this.setState({
        error: false
      });

      let cleanedState = {
        title: this.state.title,
        content: this.state.content,
        _id: this.state._id
      }

      this.props.updateUserNote(cleanedState, this.props.history);
    } else {
      this.setState({
        error: errorMessage
      })
    }
    
  }

  componentDidMount = () => {
    this.props.getUserNote(this.props.match.params.id, this.props.history);
  }

  /**
   * fills the form with the user data
   * 
   * @param {Object} props - the current props
   * @param {Object} state - the current state
   */

  static getDerivedStateFromProps(props, state) {
    const { note } = props;

    if (note && !state.dataFilled) {
      return {
        title: note.title,
        content: note.content,
        _id: note._id,
        dataFilled: true
      };
    } else {
      return state;
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="title">
            title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={this.handleChange}
            value={this.state.title} />
        </div>
        <label htmlFor='content'></label>
        <ReactQuill
          id="content"
          modules={this.modules}
          formats={this.formats}
          value={this.state.content}
          onChange={this.onQuillChange} />

        <div>
          <button>submit</button>

          {/* errors made on the frontend */}
          { this.state.error ? (
            <p>
              { this.state.error }
            </p>
          ) : (
            null
          )}

          {/* errors sent from backend */}
          {
            this.props.error ? (
              <p>
                { this.props.error }
              </p>
            ) : (
              null
            )}

        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    note: state.notes.note,
    error: state.notes.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserNote: (noteId, history) => dispatch(getUserNoteAction(noteId, history)),
    updateUserNote: (note, history) => dispatch(updateUserNoteAction(note, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNote);