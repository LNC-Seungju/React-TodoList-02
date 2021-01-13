import React, { useState } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Modal } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './Todo.css';
import db from './firebase';
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    border: '2px solid #000',
  },
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
    <Modal className={classes.paper}
      open={open}
      onClose={e => setOpen(false)}
    >
      <div className={classes.paper}>
        <h1>open</h1>
        <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
        <button onClick={ e => setOpen(false)}>close</button>
      </div>
    </Modal>
    <List className="todo-list">
      <ListItem>
        <ListItemAvatar>
        </ListItemAvatar>
        <ListItemText primary={props.todo.todo} secondary='Task details'/>
      </ListItem>
      <button onClick={e => setOpen(true)}>Edit</button>
      <DeleteForeverIcon color="secondary" onClick={event => db.collection('todos').doc(props.todo.id).delete()}>Delete</DeleteForeverIcon>
    </List>
    </>
  )
}

export default Todo;