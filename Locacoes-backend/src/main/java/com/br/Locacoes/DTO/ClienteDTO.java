package com.br.Locacoes.DTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ClienteDTO {
    private Long id;
    private String nome;
    private String email;
    private String telefone;
    private String cpf;
    private LocalDateTime dataCriacao;
}
