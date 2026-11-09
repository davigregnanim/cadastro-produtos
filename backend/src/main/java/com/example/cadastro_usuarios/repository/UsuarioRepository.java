package com.example.cadastro_usuarios.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.cadastro_usuarios.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {
    
}
