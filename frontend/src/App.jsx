import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import ProdutoForm from "./components/ProdutoForm";
import ProdutoList from "./components/ProdutoList";

// Endereço da API.
const API_URL = "/produtos";

const FORM_VAZIO = {
  nome: "",
  categoria: "",
  valor: "",
  quantidade: ""
};

function App() {
  // Dados da API
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  // Formulário
  const [form, setForm] = useState(FORM_VAZIO);
  const [editandoId, setEditandoId] = useState(null);
  const [salvando, setSalvando] = useState(false);

  // Busca e avisos
  const [busca, setBusca] = useState("");
  const [aviso, setAviso] = useState(null);

  // ---------------------------------------------------------------
  // GET /produtos -> lista todos os produtos
  // ---------------------------------------------------------------

  function carregarProdutos() {
    setLoading(true);
    setErro("");

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((dados) => {
        setProdutos(dados);
        setLoading(false);
      })
      .catch(() => {
        setErro(
          "Não foi possível carregar os produtos. Confira se a API está rodando."
        );
        setLoading(false);
      });
  }

  // Executa uma vez quando a aplicação abre.
  useEffect(() => {
    carregarProdutos();
  }, []);

  // Atualiza o título da aba quando a lista muda.
  useEffect(() => {
    document.title = `Produtos (${produtos.length})`;
  }, [produtos]);

  // ---------------------------------------------------------------
  // POST /produtos -> cadastra um novo produto
  // ---------------------------------------------------------------

  function cadastrar() {
    setSalvando(true);

    const dadosProduto = {
      nome: form.nome,
      categoria: form.categoria,
      valor: Number(form.valor),
      quantidade: Number(form.quantidade)
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dadosProduto)
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((criado) => {
        setProdutos((anterior) => [...anterior, criado]);
        limparFormulario();

        setAviso({
          tipo: "sucesso",
          texto: `${criado.nome} foi cadastrado.`
        });

        setSalvando(false);
      })
      .catch(() => {
        setAviso({
          tipo: "erro",
          texto: "Não foi possível cadastrar o produto. Tente novamente."
        });

        setSalvando(false);
      });
  }

  // ---------------------------------------------------------------
  // PUT /produtos/{id} -> atualiza um produto
  // ---------------------------------------------------------------

  function atualizar() {
    setSalvando(true);

    const dadosProduto = {
      nome: form.nome,
      categoria: form.categoria,
      valor: Number(form.valor),
      quantidade: Number(form.quantidade)
    };

    fetch(`${API_URL}/${editandoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dadosProduto)
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((atualizado) => {
        setProdutos((anterior) =>
          anterior.map((p) =>
            p.id === atualizado.id ? atualizado : p
          )
        );

        limparFormulario();

        setAviso({
          tipo: "sucesso",
          texto: `${atualizado.nome} foi atualizado.`
        });

        setSalvando(false);
      })
      .catch(() => {
        setAviso({
          tipo: "erro",
          texto: "Não foi possível atualizar o produto."
        });

        setSalvando(false);
      });
  }

  // ---------------------------------------------------------------
  // DELETE /produtos/{id} -> exclui um produto
  // ---------------------------------------------------------------

  function excluir(produto) {
    if (!window.confirm(`Excluir ${produto.nome}?`)) return;

    fetch(`${API_URL}/${produto.id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        setProdutos((anterior) =>
          anterior.filter((p) => p.id !== produto.id)
        );

        if (editandoId === produto.id) {
          limparFormulario();
        }

        setAviso({
          tipo: "sucesso",
          texto: `${produto.nome} foi excluído.`
        });
      })
      .catch(() => {
        setAviso({
          tipo: "erro",
          texto: "Não foi possível excluir o produto."
        });
      });
  }

  // ---------------------------------------------------------------
  // Funções de apoio
  // ---------------------------------------------------------------

  function limparFormulario() {
    setForm(FORM_VAZIO);
    setEditandoId(null);
  }

  function iniciarEdicao(produto) {
    setForm({
      nome: produto.nome,
      categoria: produto.categoria,
      valor: String(produto.valor),
      quantidade: String(produto.quantidade)
    });

    setEditandoId(produto.id);
    setAviso(null);
  }

  function enviarFormulario(evento) {
    evento.preventDefault();
    setAviso(null);

    if (editandoId === null) {
      cadastrar();
    } else {
      atualizar();
    }
  }

  // Busca por nome ou categoria.
  const filtrados = produtos.filter(
    (p) =>
      (p.nome ?? "").toLowerCase().includes(busca.toLowerCase()) ||
      (p.categoria ?? "").toLowerCase().includes(busca.toLowerCase())
  );

  // ---------------------------------------------------------------
  // Interface
  // ---------------------------------------------------------------

  return (
    <main className="pagina">
      <header className="cabecalho">
        <h1>Cadastro de produtos</h1>
        <p>Cadastre, edite e exclua produtos da API Spring Boot.</p>
      </header>

      <div className="layout">
        <section className="painel">
          <h2>
            {editandoId === null
              ? "Novo produto"
              : `Editando produto ${editandoId}`}
          </h2>

          <ProdutoForm
            form={form}
            setForm={setForm}
            editando={editandoId !== null}
            salvando={salvando}
            onSubmit={enviarFormulario}
            onCancelar={limparFormulario}
          />

          {aviso && (
            <p className={`aviso aviso-${aviso.tipo}`} role="status">
              {aviso.texto}
            </p>
          )}
        </section>

        <section className="painel">
          <div className="painel-topo">
            <h2>Produtos ({produtos.length})</h2>

            <button
              type="button"
              className="secundario"
              onClick={carregarProdutos}
              disabled={loading}
            >
              Recarregar produtos
            </button>
          </div>

          <SearchBar busca={busca} setBusca={setBusca} />

          {loading && (
            <p className="mensagem">Carregando...</p>
          )}

          {!loading && erro && (
            <p className="mensagem mensagem-erro" role="alert">
              {erro}
            </p>
          )}

          {!loading && !erro && (
            <ProdutoList
              produtos={filtrados}
              totalGeral={produtos.length}
              editandoId={editandoId}
              onEditar={iniciarEdicao}
              onExcluir={excluir}
            />
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
