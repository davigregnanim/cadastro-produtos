
function SearchBar({ busca, setBusca }) {
  return (
    <label className="campo">
      Buscar por nome ou categoria

      <input
        type="search"
        placeholder="Digite para filtrar..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
    </label>
  );
}

export default SearchBar;
