package com.example.cadastro_usuarios.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cadastro_usuarios.model.Usuario;
import com.example.cadastro_usuarios.repository.UsuarioRepository;

@Service 
public class UsuarioService {

    @Autowired 
    private UsuarioRepository usuarioRepository;

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario atualizar(Long id, Usuario novo) {
        Usuario existente = buscarPorId(id);


        existente.setEmail(novo.getEmail());
        existente.setNome(novo.getNome());


        return usuarioRepository.save(existente);
    }

    public void excluir(Long id) {
        usuarioRepository.deleteById(id);
    }

    
}
