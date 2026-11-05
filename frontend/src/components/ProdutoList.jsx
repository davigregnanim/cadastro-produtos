function iniciais(nome = "") {
  return nome
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte[0]?.toUpperCase() ?? "")
    .join("");
}

function ProdutoList({
  produtos,
  totalGeral,
  editandoId,
  onEditar,
  onExcluir
}) {
  if (produtos.length === 0) {
    return (
      <p className="mensagem">
        {totalGeral === 0
          ? "Nenhum produto cadastrado ainda. Use o formulário para criar o primeiro."
          : "Nenhum produto encontrado."}
      </p>
    );
  }

  return (
    <ul className="lista">
      {produtos.map((produto) => (
        <li
          key={produto.id}
          className={
            produto.id === editandoId
              ? "item item-editando"
              : "item"
          }
        >
          <span className="avatar" aria-hidden="true">
            {iniciais(produto.nome)}
          </span>

          <div className="dados">
            <strong>{produto.nome}</strong>

            <span>Categoria: {produto.categoria}</span>

            <span>
              Valor: R$ {Number(produto.valor).toFixed(2)}
            </span>

            <span>Quantidade: {produto.quantidade}</span>

            <small>ID {produto.id}</small>
          </div>

          <div className="acoes">
            <button
              type="button"
              className="secundario"
              onClick={() => onEditar(produto)}
            >
              Editar
            </button>

            <button
              type="button"
              className="perigo"
              onClick={() => onExcluir(produto)}
            >
              Excluir
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProdutoList;
