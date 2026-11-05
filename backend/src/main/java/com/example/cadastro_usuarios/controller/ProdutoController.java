package com.example.cadastro_usuarios.controller;

import com.example.cadastro_usuarios.model.Produto;
import com.example.cadastro_usuarios.service.ProdutoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    public List<Produto> listarTodos() {
        return produtoService.listarTodos();
    }

    @PostMapping
    public Produto criar(@RequestBody Produto produto) {
        return produtoService.salvar(produto);
    }

    @PutMapping("/{id}")
    public Produto atualizar(
            @PathVariable Long id,
            @RequestBody Produto produto) {
        return produtoService.atualizar(id, produto);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        produtoService.excluir(id);
    }

    @GetMapping("/{id}")
    public Produto buscar(@PathVariable Long id) {
        return produtoService.buscarPorId(id);
    }
}