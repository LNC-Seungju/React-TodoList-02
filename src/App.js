import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

// Style
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  title: { margin: '50px 0', fontSize: 50, color: 'royalblue'},
  app: {  textAlign: 'center' },
  list: { 
    width: '50%',
    margin: '50px auto 0',
    padding: '50px',
    textAlign: 'center',
    borderLeft: '2px solid #eee',
    borderRight: '2px solid #eee',
    '& li':{
      borderBottom: '2px solid skyblue',
    }
  },
}))
function App() {
  const classes = useStyles();
  const [ todos, setTodos ] = useState([])
  const [ input, setInput ] = useState('');
  
  useEffect( () => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, []);
  const addTodo = (event) => {
    event.preventDefault(); // Stop the Refresh

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setTodos([...todos, input]);
    setInput(''); // Clear Input
  }

  return (
    <div className={classes.app}>
      <h1 className={classes.title}>React Todo List</h1>
      <form>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input value={input} onChange={e => setInput(e.target.value)} />
        </FormControl>
        <Button disabled={!input} type="submit" variant="contained" color="primary" onClick={addTodo}>
          Add</Button>
        {/* <button type="submit" onClick={addTodo}>Add</button> */}
      </form>
      <ul className={classes.list}>
        {todos.map( (todo) => 
          <Todo todo={todo} className={classes.listItem}/>
          // <li>{todo}</li>
        )}
      </ul>
    </div>
  );
}

export default App;
