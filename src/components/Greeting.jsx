import { useState, useEffect } from "react";
import axios from "axios";
import { SelectLanguage } from "./SelectLanguage";
import { EnterName } from "./EnterName";
import { UserGreeting } from "./UserGreeting";
import { EnterGreeting } from "./EnterGreeting";
import { Counter } from "./Counter";

export default function Greeting() {
  const [languages, setLanguages] = useState([]);
  const [languageValue, setLanguageValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [greeting, setGreeting] = useState("");
  const [enteredLanguage, setEnteredLanguage] = useState("");
  const [enteredGreeting, setEnteredGreeting] = useState("");
  const [greetingsCounter, setGreetingsCounter] = useState("");

  // Retrieving languages from the API
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

  useEffect(() => {
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
      await fetchGreetingsCounter();
    } catch (error) {
      console.log("Error while creating a greeting", error);
    }
  }

  function languageHandler(event) {
    setEnteredLanguage(event.target.value);
  }

  function greetingHandler(event) {
    setEnteredGreeting(event.target.value);
  }

  async function onSubmitGreetingHandler(event) {
    event.preventDefault();
    try {
      await axios.post(
        "https://greetings-typescript-backend.onrender.com/api/addGreeting",
        {
          language: enteredLanguage,
          greeting: enteredGreeting,
        }
      );
      await fetchLanguages();
    } catch (error) {
      console.log("Error while creating a language and a greeting", error);
    }
  }

  async function fetchGreetingsCounter() {
    try {
      const response = await axios.get(
        "https://greetings-typescript-backend.onrender.com/api/counter"
      );
      setGreetingsCounter(Number(response.data));
    } catch (error) {
      console.log("Error while fetching languages", error);
    }
  }
  useEffect(() => {
    fetchGreetingsCounter();
  }, []);

  return (
    <>
      <EnterGreeting
        onSubmitGreeting={onSubmitGreetingHandler}
        enteredLanguage={languageHandler}
        enteredGreeting={greetingHandler}
      />
      <div>
        <Counter counter={greetingsCounter} />
        <form onSubmit={onSubmitHandler}>
          <EnterName onName={onUsernameHandler} />
          <SelectLanguage languages={languages} onSelect={onLanguageHandler} />
          <button type="submit">Add Greeting</button>
          <UserGreeting greeting={greeting} />
        </form>
      </div>
    </>
  );
}
