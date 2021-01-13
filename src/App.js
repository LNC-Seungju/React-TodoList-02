import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import './App.css';
import firebase from 'firebase';

function App() {
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
    <div className="App">
      <h1>Todo List</h1>
      <form>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input value={input} onChange={e => setInput(e.target.value)} />
        </FormControl>
        <Button disabled={!input} type="submit" variant="contained" color="primary" onClick={addTodo}>
          Add</Button>
        {/* <button type="submit" onClick={addTodo}>Add</button> */}
      </form>
      <ul>
        {todos.map( (todo) => 
          <Todo todo={todo}/>
          // <li>{todo}</li>
        )}
      </ul>
    </div>
  );
}

export default App;
