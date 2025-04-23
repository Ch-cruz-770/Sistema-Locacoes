package com.br.Locacoes.Controller;

import com.br.Locacoes.DTO.ClienteDTO;
import com.br.Locacoes.Model.Cliente;
import com.br.Locacoes.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    private ClienteDTO toDTO(Cliente cliente) {
        ClienteDTO dto = new ClienteDTO();
        dto.setId(cliente.getId());
        dto.setNome(cliente.getNome());
        dto.setEmail(cliente.getEmail());
        dto.setTelefone(cliente.getTelefone());
        dto.setCpf(cliente.getCpf());
        dto.setDataCriacao(cliente.getDataCriacao());
        return dto;
    }

    private Cliente toEntity (ClienteDTO dto){
       Cliente cliente = new Cliente();
       cliente.setNome(dto.getNome());
       cliente.setEmail(dto.getEmail());
       cliente.setTelefone(dto.getTelefone());
       cliente.setCpf(dto.getCpf());
       cliente.setDataCriacao(dto.getDataCriacao());
       return cliente;
    }

    @PostMapping
    public ClienteDTO criarCliente(@RequestBody ClienteDTO dto){
        Cliente cliente = toEntity(dto);
        Cliente salvo = clienteRepository.save(cliente);
        return toDTO(salvo);
    }

    @GetMapping
    public List<ClienteDTO> listarClientes() {
        return clienteRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteDTO> atualizarCliente(@PathVariable Long id, @RequestBody ClienteDTO dto) {
        Optional<Cliente> clienteOptional = clienteRepository.findById(id);

        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();
            cliente.setNome(dto.getNome());
            cliente.setEmail(dto.getEmail());
            cliente.setTelefone(dto.getTelefone());
            cliente.setCpf(dto.getCpf());
            cliente.setDataCriacao(dto.getDataCriacao());

            Cliente clienteAtualizado = clienteRepository.save(cliente);
            return ResponseEntity.ok(toDTO(clienteAtualizado));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCliente(@PathVariable Long id) {
        if (clienteRepository.existsById(id)) {
            clienteRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
