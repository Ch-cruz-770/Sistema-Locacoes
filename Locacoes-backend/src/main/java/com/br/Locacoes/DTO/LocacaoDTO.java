package com.br.Locacoes.DTO;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class LocacaoDTO {
    private Long id;
    private String nome;
    private String tipo;
    private String descricao;
    private BigDecimal valorHora;
    private Integer tempoMinimo;
    private Integer tempoMaximo;
    private LocalDateTime dataCriacao;
}
