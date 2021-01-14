import React, { useState } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Modal } from '@material-ui/core';
import './Todo.css';
import db from './firebase';

// Styles
import { makeStyles } from '@material-ui/styles'

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    width: 400,
    height: 500 ,
    backgroundColor: 'white',
    outline: 'none',
    borderRadius: '10px',
    padding: 20,
  },
  avatar: {
    height: '55px',
    margin: '0 20px 0 0',
    border: '3px solid #eee',
    borderRadius: '50%'
  },
  modalTitle: {
    margin: '30px 0',
    padding: '0 0 10px',
    borderBottom: '1px solid royalblue',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    '& > div': {
      width: '20%',
      '& > *': {
        width: '50%',
      }
    },
  },
  input: { 
    width: '90%',
    height: '30px',
    border: 'none',
    outline: 'none',
    borderBottom: '1px solid skyblue'
  }
}))

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const updateTodo = () => {
    db.collection('todos').doc(props.todo.id).set({
      todo: input
    }, { merge: true }) 
    setOpen(false);
  }
  return (
    <>
    <Modal
      open={open}
      onClose={e => setOpen(false)}
    >
      <div className={classes.paper}>
        <h1 className={classes.modalTitle}>open</h1>
        <form className={classes.flex}>
          <input 
            className={classes.input}
            placeholder={props.todo.todo} 
            value={input} onChange={event => setInput(event.target.value)}
          />
          <div>
            <CheckIcon onClick={ e => (updateTodo())}>Modify</CheckIcon>
            <CloseIcon onClick={ e => setOpen(false)}>Close</CloseIcon>
          </div>
        </form>
      </div>
    </Modal>
    <List className="todo-list">
      <ListItem>
        <ListItemAvatar className={classes.avatar}>
        </ListItemAvatar>
        <ListItemText primary={props.todo.todo} secondary='Task details'/>
      <div>
        <DeleteForeverIcon color="secondary" onClick={event => db.collection('todos').doc(props.todo.id).delete()}>Delete</DeleteForeverIcon>
        <EditIcon onClick={e => setOpen(true)}>Edit</EditIcon>
      </div>
      </ListItem>
    </List>
    </>
  )
}

export default Todo;