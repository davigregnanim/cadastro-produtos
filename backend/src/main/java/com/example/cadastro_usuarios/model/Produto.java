package com.example.cadastro_usuarios.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String categoria;
    private BigDecimal valor;
    private Integer quantidade;
}