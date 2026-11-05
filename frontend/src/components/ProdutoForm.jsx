function ProdutoForm({
  form,
  setForm,
  editando,
  salvando,
  onSubmit,
  onCancelar
}) {
  function alterarCampo(evento) {
    const { name, value } = evento.target;

    setForm((anterior) => ({
      ...anterior,
      [name]: value
    }));
  }

  return (
    <form onSubmit={onSubmit} className="formulario">

      <label className="campo">
        Nome do produto

        <input
          name="nome"
          type="text"
          required
          value={form.nome}
          onChange={alterarCampo}
          placeholder="Celular"
          autoComplete="off"
        />
      </label>

      <label className="campo">
        Categoria

        <input
          name="categoria"
          type="text"
          required
          value={form.categoria}
          onChange={alterarCampo}
          placeholder="Eletrônicos"
          autoComplete="off"
        />
      </label>

      <label className="campo">
        Valor

        <input
          name="valor"
          type="number"
          min="0"
          step="0.01"
          required
          value={form.valor}
          onChange={alterarCampo}
          placeholder="129.90"
        />
      </label>

      <label className="campo">
        Quantidade

        <input
          name="quantidade"
          type="number"
          min="0"
          step="1"
          required
          value={form.quantidade}
          onChange={alterarCampo}
          placeholder="15"
        />
      </label>

      <div className="botoes">
        <button type="submit" disabled={salvando}>
          {salvando
            ? "Salvando..."
            : editando
              ? "Salvar alterações"
              : "Cadastrar produto"}
        </button>

        {editando && (
          <button
            type="button"
            className="secundario"
            onClick={onCancelar}
          >
            Cancelar edição
          </button>
        )}
      </div>

    </form>
  );
}

export default ProdutoForm;
