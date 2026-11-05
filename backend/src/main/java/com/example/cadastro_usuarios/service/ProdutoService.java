package com.example.cadastro_usuarios.service;

import com.example.cadastro_usuarios.model.Produto;
import com.example.cadastro_usuarios.repository.ProdutoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public Produto salvar(Produto produto) {
        return produtoRepository.save(produto);
    }

    public Produto buscarPorId(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Produto não encontrado"));
    }

    public Produto atualizar(Long id, Produto novo) {
        Produto existente = buscarPorId(id);

        existente.setNome(novo.getNome());
        existente.setCategoria(novo.getCategoria());
        existente.setValor(novo.getValor());
        existente.setQuantidade(novo.getQuantidade());

        return produtoRepository.save(existente);
    }

    public void excluir(Long id) {
        if (!produtoRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Produto não encontrado");
        }

        produtoRepository.deleteById(id);
    }
}