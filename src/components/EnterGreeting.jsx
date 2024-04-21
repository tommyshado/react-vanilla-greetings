export function EnterGreeting({ enteredLanguage, enteredGreeting, onSubmitGreeting }) {
  return (
    <header>
      <form onSubmit={onSubmitGreeting}>
        <div>
          <span>Enter language</span>
          <br />
          <input
            type="text"
            name="language"
            onChange={enteredLanguage}
            placeholder="Enter language" />
        </div>

        <div>
          <span>Enter greeting</span>
          <br />
          <input
            type="text"
            name="greeting"
            onChange={enteredGreeting}
            placeholder="Enter greeting" />
        </div>

        <button type="submit">Enter greeting</button>
      </form>
    </header>
  );
}
