import React, { use, useState } from "react";
import { Link } from "react-router";

const Users = ({ userPromise }) => {
  const initialUsers = use(userPromise);
  console.log(initialUsers);
  const [users, setUsers] = useState(initialUsers);

  const handleAddUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    console.log(user);

    // send data to server
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data saved is successful", data);
        if (data.insertedId) {
          alert("User added successfully");
          user._id = data.insertedId;
          const newUsers = [...users, user];
          setUsers(newUsers);
          event.target.reset();
        }
      });
  };

  const handleDeleteUser = (id) => {
    console.log("Deleting user with id:", id);
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User deleted successfully", data);
        if (data.deletedCount > 0) {
          alert("User deleted successfully");
          const remainingUsers = users.filter((user) => user._id !== id);
          setUsers(remainingUsers);
        }
      });
  };

  return (
    <div>
      <h1>{users.length}</h1>
      <form onSubmit={handleAddUser}>
        <label htmlFor="name">Enter Your Name: </label>
        <input type="text" name="name" />
        <br />
        <label htmlFor="email">Enter Your Email: </label>
        <input type="email" name="email" />
        <br />
        <input type="submit" value="Add User" />
      </form>
      <p>----------------------------</p>
      <div>
        {users.map((user) => (
          <div key={user._id}>
            <p>
              {user.name}
              <Link to={`/users/${user._id}`}> Details </Link>
              <Link to={`/update/${user._id}`}> Update </Link>
              <button onClick={() => handleDeleteUser(user._id)}>X</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
