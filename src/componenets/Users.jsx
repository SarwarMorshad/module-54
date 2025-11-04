import React from "react";

const Users = () => {
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
          event.target.reset();
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleAddUser}>
        <label htmlFor="name">Enter Your Name: </label>
        <input type="text" name="name" />
        <br />
        <label htmlFor="email">Enter Your Email: </label>
        <input type="email" name="email" />
        <br />
        <input type="submit" value="Add User" />
      </form>
    </div>
  );
};

export default Users;
