package com.br.Locacoes.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
public class Locacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String tipo;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(name = "valor_hora", precision = 10, scale = 2)
    private BigDecimal valorHora;

    @Column(name = "tempo_minimo")
    private Integer tempoMinimo;

    @Column(name = "tempo_maximo")
    private Integer tempoMaximo;

    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao = LocalDateTime.now();
}
