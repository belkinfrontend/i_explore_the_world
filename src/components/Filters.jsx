export function Filters({
  search,
  onSearchChange,
  onlyMissing,
  onOnlyMissingChange,
}) {
  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Поиск по названию..."
      />

      <div className="checkbox-container">
        <input
          type="checkbox"
          id="availabilityCheckbox"
          checked={onlyMissing}
          onChange={(event) => onOnlyMissingChange(event.target.checked)}
        />
        <label htmlFor="availabilityCheckbox">Только отсутствующие</label>
      </div>
    </>
  );
}
