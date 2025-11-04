import React, { useState } from "react";
import { useLoaderData } from "react-router";

const UpdateUser = () => {
  const user = useLoaderData();
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleUpdateUser = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const afterUpdatedUser = { name, email };

    // send updated data to server
    fetch(`http://localhost:3000/users/${user._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(afterUpdatedUser), // ✅ Send new data
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User updated successfully", data);
        if (data.modifiedCount > 0) {
          alert("User updated successfully");
          setUpdatedUser(afterUpdatedUser); // ✅ Update state with new data
          event.target.reset();
        }
      });
  };

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={handleUpdateUser}>
        <label>
          Name:
          <input type="text" name="name" defaultValue={user.name} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" defaultValue={user.email} />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
      <div>
        <h2>Updated User Details:</h2>
        <p>Name: {updatedUser.name}</p>
        <p>Email: {updatedUser.email}</p>
      </div>
    </div>
  );
};

export default UpdateUser;
