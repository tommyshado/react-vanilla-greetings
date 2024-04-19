export function SelectLanguage({ languages, onSelect }) {
  return (
    <div>
      {languages.map((results, idx) => {
        return (
          <span key={idx}>
            <input
              type="radio"
              name="language"
              value={results.language}
              onClick={onSelect}
            />
            <label htmlFor={results.language}>{results.language}</label>
          </span>
        );
      })}
    </div>
  );
}
