package com.example.cadastro_usuarios.repository;

import com.example.cadastro_usuarios.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}