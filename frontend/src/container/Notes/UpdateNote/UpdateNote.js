import React, { Component } from 'react';

import { connect } from 'react-redux';

import { getUserNoteAction, updateUserNoteAction, deleteUserNoteAction } from '../../../store/actions/';

import Buttons from '../../../component/Buttons/Buttons';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import classes from '../CreateNote/CreateNote.module.css'


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
      [{ header: '1' }, { header: '2' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['code-block']
    ]
  };

  formats = [
    'header',
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
      <div className={classes['container']}>
        <Buttons
          ableToEdit={false}
          noteId={this.state._id ? this.state._id : null}
          deleteUserNote={this.props.deleteUserNote}
          history={this.props.history} />
        <form
          className={classes['form']} 
          onSubmit={this.handleSubmit}>
          <div className={classes['form__group']}>
            <label
              className={classes['form__label']}
              htmlFor="title">
              title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={classes['form__input']}
              onChange={this.handleChange}
              value={this.state.title} />
          </div>
          <div className={classes['form__group']}>
            <label
              className={classes['form__label']}
              htmlFor='content'>
              content
            </label>
            <ReactQuill
              id="content"
              className={classes['form__texteditor']}
              modules={this.modules}
              formats={this.formats}
              value={this.state.content}
              placeholder='Write about what you are feeling. :)'
              onChange={this.onQuillChange} />
          </div>

          <div className={classes['form__button--container']}>
            <button className={classes['form__button']}>Edit</button>

            {/* errors made on the frontend */}
            {this.state.error ? (
              <p className='error'>
                {this.state.error}
              </p>
            ) : (
                null
              )}

            {/* errors sent from backend */}
            {
              this.props.error ? (
                <p className='error'>
                  {this.props.error}
                </p>
              ) : (
                  null
                )}
          </div>
        </form>
      </div>
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
    updateUserNote: (note, history) => dispatch(updateUserNoteAction(note, history)),
    deleteUserNote: (noteId) => {
      dispatch(deleteUserNoteAction(noteId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNote);