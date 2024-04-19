export function EnterName({ onName }) {
  return (
    <div>
      <span>Enter name</span>
      <br />
      <input
        type="text"
        name="username"
        placeholder="Enter your name"
        onChange={onName} />
    </div>
  );
}
