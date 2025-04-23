package com.br.Locacoes.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "locacao_id")
    private Locacao locacao;

    private LocalDateTime dataInicio;
    private LocalDateTime dataFim;
    private BigDecimal valorFinal;
    private String situacao;
    private LocalDateTime dataCriacao;

    @PrePersist
    public void prePersit(){
        this.dataCriacao = LocalDateTime.now();
    }
}
