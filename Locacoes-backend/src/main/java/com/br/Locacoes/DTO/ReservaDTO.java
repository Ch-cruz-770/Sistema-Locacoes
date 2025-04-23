package com.br.Locacoes.DTO;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ReservaDTO {

    private Long id;
    private Long clienteId;
    private Long locacaoId;
    private LocalDateTime dataInicio;
    private LocalDateTime dataFim;
    private BigDecimal valorFinal;
    private String situacao;
    private LocalDateTime dataCriacao;
}
