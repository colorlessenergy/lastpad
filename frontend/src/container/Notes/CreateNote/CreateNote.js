import React, { Component } from 'react';

import { connect } from 'react-redux';

import { createNoteAction } from '../../../store/actions/note';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class CreateNote extends Component {

  state = {
    title: '',
    content: ''
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

    console.log(this.props)
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
          placeholder='Write about what you are feeling. :)'
          onChange={this.onQuillChange} />

        <div>
          <button>submit</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    note: state.notes.note 
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