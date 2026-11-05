package com.example.cadastro_usuarios.service;

import com.example.cadastro_usuarios.model.Usuario;
import com.example.cadastro_usuarios.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll(); // SELECT * FROM usuario
    }

    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);// INSERT INTO usuario (usuario.getNome(),usuario.getEmail())
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
