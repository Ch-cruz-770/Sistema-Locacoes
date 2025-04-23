package com.br.Locacoes.Controller;

import com.br.Locacoes.DTO.ReservaDTO;
import com.br.Locacoes.Model.Cliente;
import com.br.Locacoes.Model.Locacao;
import com.br.Locacoes.Model.Reserva;
import com.br.Locacoes.Repository.ClienteRepository;
import com.br.Locacoes.Repository.LocacaoRepository;
import com.br.Locacoes.Repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reserva")
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private LocacaoRepository locacaoRepository;

    private ReservaDTO toDTO(Reserva reserva) {
        ReservaDTO dto =new ReservaDTO();
        dto.setId(reserva.getId());
        dto.setClienteId(reserva.getCliente().getId());
        dto.setLocacaoId(reserva.getLocacao().getId());
        dto.setDataInicio(reserva.getDataInicio());
        dto.setDataFim(reserva.getDataFim());
        dto.setValorFinal(reserva.getValorFinal());
        dto.setSituacao(reserva.getSituacao());
        dto.setDataCriacao(reserva.getDataCriacao());
        return dto;
    }

    private Reserva toEntity(ReservaDTO dto, Cliente cliente, Locacao locacao) {
        Reserva reserva = new Reserva();
        reserva.setCliente(cliente);
        reserva.setLocacao(locacao);
        reserva.setDataInicio(dto.getDataInicio());
        reserva.setDataFim(dto.getDataFim());
        reserva.setSituacao(dto.getSituacao());
        reserva.setDataCriacao(LocalDateTime.now());

       //Calculo do valor final
        if (dto.getDataInicio() != null && dto.getDataFim() != null && locacao.getValorHora() != null) {
            long horas = Duration.between(dto.getDataInicio(), dto.getDataFim()).toHours();
            BigDecimal valorFinal = locacao.getValorHora().multiply(BigDecimal.valueOf(horas));
            reserva.setValorFinal(valorFinal);
        }
        return reserva;
    }

    @PostMapping
    public ReservaDTO criarReserva(@RequestBody ReservaDTO dto) {
        Cliente cliente = clienteRepository.findById(dto.getClienteId())
                .orElseThrow(()-> new RuntimeException("Cliente não encontrado"));

        Locacao locacao = locacaoRepository.findById(dto.getLocacaoId())
                .orElseThrow(()-> new RuntimeException("Locação não encontrado"));

        Reserva reserva = toEntity(dto, cliente, locacao);
        Reserva salva = reservaRepository.save(reserva);

        return toDTO(salva);
    }

    @GetMapping
    public List<ReservaDTO> listarReserva() {
       return reservaRepository.findAll().stream()
               .map(this::toDTO)
               .collect(Collectors.toList());
    }
    //Buscar Reserva por ID
    @GetMapping("/{id}")
    public ResponseEntity<ReservaDTO> buscarReservaPorId(@PathVariable Long id) {
        Optional<Reserva> reservaOptional = reservaRepository.findById(id);
        return reservaOptional.map(reserva -> ResponseEntity.ok(toDTO(reserva)))
                .orElseGet(()-> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservaDTO> atualizarReserva(@PathVariable Long id, @RequestBody ReservaDTO dto) {
        Optional<Reserva> optional = reservaRepository.findById(id);
        if (optional.isPresent()) {
            Reserva reserva = optional.get();

            reserva.setDataInicio(dto.getDataInicio());
            reserva.setDataFim(dto.getDataFim());
            reserva.setSituacao(dto.getSituacao());

            //Recalcular o valor final se as datas forem válidas.
            if (dto.getDataInicio() != null && dto.getDataFim() != null && reserva.getLocacao().getValorHora() != null) {
                long horas = Duration.between(dto.getDataInicio(), dto.getDataFim()).toHours();
                reserva.setValorFinal(reserva.getLocacao().getValorHora().multiply(BigDecimal.valueOf(horas)));
            }
            Reserva atualizada = reservaRepository.save(reserva);
            return ResponseEntity.ok(toDTO(atualizada));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarReserva(@PathVariable Long id) {
        if (reservaRepository.existsById(id)) {
            reservaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
