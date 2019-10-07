import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { GetAllUserNotesAction, deleteUserNoteAction } from '../../store/actions/';
import classes from './Notes.module.css'

import renderHTML from 'react-render-html';

class Note extends Component {
  state = {
    filteredNotes: [],
    filter: ''
  }

  componentDidMount() {
    this.props.getAllUserNotesAction();

  }

  static getDerivedStateFromProps(props, state) {
    let notes = props.notes;

    if (state.filter === '') {
      return {
        filteredNotes: notes
      }
    }

    return state;
  }

  handleChangeFilterNotes = (ev) => {
    let filteredNotes = this.props.notes.filter((note) => {
      return (note.title.toLowerCase().includes(ev.target.value) || note.content.toLowerCase().includes(ev.target.value));
    });

    this.setState({
      filter: ev.target.value,
      filteredNotes: filteredNotes
    });
    
  }

  render() {
    if (!this.props.userAuth) {
      return <Redirect to='/login' />
    }

    let notes = this.state.filteredNotes ? this.state.filteredNotes.map(note => (
      <article key={note._id} className={classes['note']}>
        <h3 className={classes['note__title']}>
          {note.title}
        </h3>
        <div className={classes['note__paragraph']}>
          { renderHTML(note.content) }
        </div>

        <div className={classes['links']}>
          <Link className={[classes['links--edit'], classes['links__link']].join(' ')} to={'/note/update/' + note._id}>
            Edit
          </Link>
          <Link className={[classes['links--view'], classes['links__link']].join(' ')} to={'/note/' + note._id}>
            View
          </Link>
          <span className={[classes['links--delete'], classes['links__link']].join(' ')} onClick={() => this.props.deleteUserNote(note._id)}>
            Delete
          </span>
        </div>
      </article>
    )) : (null);

    return (
      <div>
        <div className={classes['filter-container']}>
          <input placeholder="filter notes" 
            className={classes['filter']} 
            type="text"
            onChange={this.handleChangeFilterNotes} />
        </div>
        <section className={classes['notes']}>
          {notes}
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes,
    userAuth: state.auth.userIsLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserNotesAction: () => {
      dispatch(GetAllUserNotesAction());
    },
    deleteUserNote: (noteId) => {
      dispatch(deleteUserNoteAction(noteId));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);