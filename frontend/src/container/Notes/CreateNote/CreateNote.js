import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; 

import { createNoteAction } from '../../../store/actions/note';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import classes from './CreateNote.module.css';

class CreateNote extends Component {

  state = {
    title: '',
    content: ''
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
   * function that runs when user types in the rich text editor
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

    this.props.createNote(this.state, this.props.history);
  }

  render() {
    if (!this.props.userAuth) {
      return <Redirect to='/login' />
    }
    
    return (
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
          <button className={classes['form__button']}>Create</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userAuth: state.auth.userIsLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNote: (note, history) => {
      dispatch(createNoteAction(note, history));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNote);