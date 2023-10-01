import React, { useState, useEffect } from "react";
import { collection, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";
import { db } from "./components/firebase";


function App(props) {
  const usersRef = collection(db, "users");
  const user = doc(usersRef, props.id);
  const [TODO, setTODO] = useState([]);
    
  useEffect(() => {
    getDoc(user).then((doc) => {
      if (doc.exists()) {
        setTODO(doc.data().todos);
      }
    });
  }, [user]);
  
  async function AddTODO(newTODO) {
    const userDoc = await getDoc(user);
    if (userDoc.exists()) {
      // Document exists, proceed with the update
      await updateDoc(user, {
        todos: [...TODO, newTODO], // Append newTODO to existing todos
      });
    } else {
      // Document doesn't exist, create it and set the initial data
      await setDoc(user, {
        todos: [newTODO], // Create a new array with the initial newTODO
      });
    }
  }

  async function DeleteTODO(idx) {
    await updateDoc(user, {
      todos: [...TODO.filter((element) => element.id !== idx)],
    });
  }

  async function checkHandler(id) {
    await updateDoc(user, {
      todos: [
        ...TODO.map((element) => {
          if (element.id === id) {
            return { ...element, checked: !element.checked };
          } else {
            return element;
          }
        }),
      ],
    });
  }

  async function displayCompleted() {
    await updateDoc(user, {
      todos: [
        ...TODO.map((element) => {
          element.completed = false;
          element.pending = true;
          if (!element.checked) 
            element.pending = false;
          return element;
        }),
      ]
    });
  }

  function displayPending() {
    updateDoc(user, {
      todos: [
        ...TODO.map((element) => {
          element.pending = true;
          element.completed = false;
          if (element.checked) 
            element.completed = true;
          return element;
        }),
      ]
    });
  }

  async function displayAll() {
    await updateDoc(user, {
       todos: [
         ...TODO.map((element) => {
           element.pending = true;
           element.completed = false;
           return element;
         }),
       ]
     });
  }

  async function deleteCompleted() {
    await updateDoc(user, {
      todos: [...TODO.filter((element) => element.checked === false)],
    });
    setTODO((prev) => {
      return prev.filter((item) => {
        return item.checked === false;
      });
    });
  }

  function signOut() {
    alert("You have been signed out !");
    displayAll();
    window.location.href = "/";
  }

  return (
    <div className="MainDiv">
    <div className="header">
      <h1>Welcome {props.id}</h1>
      <button className="signOut" onClick={signOut}>
        SignOut
      </button>
    </div>

    <CreateTodo onAdd={AddTODO} />

    {TODO.length === 0 ? (
      <div className="noTodosLeft"> No Todos Left ! </div>
    ) : null}

    {TODO.map((t) => {
      return (
        <Todos
          key={t.id}
          id={t.id}
          val={t.content}
          time={t.timeLimit}
          checked={t.checked}
          completed={t.completed}
          pending={t.pending}
          onDelete={DeleteTODO}
          onDone={checkHandler}
        />
      );
    })}

    <div className="filter-buttons">
      <button className="displayPending" onClick={displayPending}>
        Show Pending
      </button>
      <button className="displayCompleted" onClick={displayCompleted}>
        Show Completed
      </button>
      <button className="displayAll" onClick={displayAll}>
        Show All
      </button>
      <button className="deleteCompleted" onClick={deleteCompleted}>
        Delete Completed
      </button>
    </div>
  </div>
  );
}

export default App;
