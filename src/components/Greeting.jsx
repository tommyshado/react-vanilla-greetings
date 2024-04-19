import { useState, useEffect } from "react";
import axios from "axios";
import { SelectLanguage } from "./SelectLanguage";
import { EnterName } from "./EnterName";
import { UserGreeting } from "./UserGreeting";

export default function Greeting() {
  const [languages, setLanguages] = useState([]);
  const [languageValue, setLanguageValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [greeting, setGreeting] = useState("");

  // Retrieving languages from the API
  useEffect(() => {
    async function fetchLanguages() {
      try {
        const response = await axios.get(
          "https://greetings-typescript-backend.onrender.com/api"
        );
        setLanguages(response.data);
      } catch (error) {
        console.log("Error while fetching languages", error);
      }
    }
    fetchLanguages();
  }, []);

  function onUsernameHandler(event) {
    setUsernameValue(event.target.value);
  }

  function onLanguageHandler(event) {
    setLanguageValue(event.target.value);
  }

  // Inserting username & language into the API
  async function onSubmitHandler(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://greetings-typescript-backend.onrender.com/api/greeting",
        {
          username: usernameValue,
          language: languageValue,
        }
      );
      setGreeting(response.data);
    } catch (error) {
      console.log("Error while creating a greeting", error);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <EnterName onName={onUsernameHandler} />
        <SelectLanguage languages={languages} onSelect={onLanguageHandler} />
        <br />
        <button type="submit">Add Greeting</button>
        <UserGreeting greeting={greeting} />
      </form>
    </div>
  );
}
