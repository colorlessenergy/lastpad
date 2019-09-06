import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetAllUserNotesAction } from '../../store/actions/note';

class Note extends Component {
  state = {
    notes: []
  }

  componentDidMount() {
    this.props.getAllUserNotesAction();
  }

  static getDerivedStateFromProps(props, state) {
    let notes =  props.notes;

    return {
      notes: notes
    }

  }

  render() {
    // console.log(this.state.notes)
    let notes = this.state.notes !== undefined ? this.state.notes.map(note => (
      <Link to={'/note/' + note._id} key={note._id}>
        <div>
          <h1>
            {note.title}
          </h1>
          <p>
            {note.content}
          </p>
        </div>
      </Link>
    )) : (null);

    return (
      <div>
        <h1>home HELLO</h1>
        { notes }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserNotesAction: () => {
      dispatch(GetAllUserNotesAction());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);