import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() =>{
    fetch("http://localhost:5000/users")
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])

  const handleAddUser = event =>{
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {name, email};
    fetch('http://localhost:5000/users', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const newUsers = [...users, data];
        setUsers(newUsers);
      })
      .catch((error) => console.error(error));
    console.log(user);
    event.target.reset();
  }

  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
        <input type="text" placeholder='Name' name ='name'/>
        <br />
        <input type="email" name="email" placeholder='Email' id="" />
        <br />
        <button type="submit">Add user</button>
      </form>
     <h2>users: {users.length}</h2>
     {
      users.map(user => <p key={user._id}> {user.name} {user.email} </p>)
     }
    </div>
  );
}

export default App;
