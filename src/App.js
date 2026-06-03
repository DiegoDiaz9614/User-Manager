import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);

  const createUser = async () => {
    await addDoc(collection(db, "users"), {
      name: newName,
      age: newAge,
    });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);

    const newFields = {
      age: age + 1,
    };

    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(collection(db, "users"));

      setUsers(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })),
      );
    };

    getUsers();
  }, []);

  return (
    <div className="App">
      <h1>User Manager</h1>

      <div className="form-container">
        <input
          placeholder="Name..."
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />

        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            setNewAge(Number(event.target.value));
          }}
        />

        <button onClick={createUser}>Create User</button>
      </div>

      <div className="users-container">
        {users.map((user) => {
          return (
            <div className="user-card" key={user.id}>
              <h2>{user.name}</h2>
              <p>{user.age} years old</p>

              <div className="button-group">
                <button
                  className="update-btn"
                  onClick={() => updateUser(user.id, user.age)}
                >
                  Increase Age
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete User
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
