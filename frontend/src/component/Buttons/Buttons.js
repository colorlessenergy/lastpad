import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Buttons.module.css';

function Buttons(props) {
  return (
    <div
      className={classes['buttons']}>
      { props.ableToEdit ? (
        <Link
          className={[classes['button'], classes['button--green']].join(' ')}
          to={'/note/update/' + props.noteId}>edit</Link>
      ) :
      (null) }
      <Link 
        className={[classes['button'], classes['button--blue']].join(' ')}
        to='/'>View All</Link>
      <span
        className={[classes['button'], classes['button--red']].join(' ')}
        onClick={() => { 
        props.deleteUserNote(props.noteId);
        props.history.push('/');
      }}>Delete</span>
    </div>
  )
}

export default Buttons;