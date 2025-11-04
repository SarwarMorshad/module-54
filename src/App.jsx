import "./App.css";
import Users from "./componenets/Users";

const userPromise = fetch("http://localhost:3000/users").then((res) => res.json());

function App() {
  return (
    <>
      <h1>Simple CRUD Client</h1>
      <Users userPromise={userPromise} />
    </>
  );
}

export default App;
