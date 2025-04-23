package com.br.Locacoes.Controller;

import com.br.Locacoes.DTO.LocacaoDTO;
import com.br.Locacoes.Model.Locacao;
import com.br.Locacoes.Repository.LocacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/locacao")
public class LocacaoController {

    @Autowired
    private LocacaoRepository locacaoRepository;

    private LocacaoDTO toDTO(Locacao locacao) {
        LocacaoDTO dto = new LocacaoDTO();
        dto.setId(locacao.getId());
        dto.setNome(locacao.getNome());
        dto.setTipo(locacao.getTipo());
        dto.setDescricao(locacao.getDescricao());
        dto.setValorHora(locacao.getValorHora());
        dto.setTempoMinimo(locacao.getTempoMinimo());
        dto.setTempoMaximo(locacao.getTempoMaximo());
        dto.setDataCriacao(locacao.getDataCriacao());
        return dto;
    }

    private Locacao toEntity (LocacaoDTO dto){
        Locacao locacao = new Locacao();
        locacao.setNome(dto.getNome());
        locacao.setTipo(dto.getTipo());
        locacao.setDescricao(dto.getDescricao());
        locacao.setValorHora(dto.getValorHora());
        locacao.setTempoMinimo(dto.getTempoMinimo());
        locacao.setTempoMaximo(dto.getTempoMaximo());
        return locacao;
    }

    @PostMapping
    public LocacaoDTO criarLocacao(@RequestBody LocacaoDTO dto) {
       Locacao locacao = toEntity(dto);
       Locacao salvo = locacaoRepository.save(locacao);
       return toDTO(salvo);
    }

    @GetMapping
    public List<LocacaoDTO> listarLocacoes() {
        return locacaoRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocacaoDTO> atualizarLocacao(@PathVariable Long id, @RequestBody LocacaoDTO dto) {
        Optional<Locacao> locacaoOptional = locacaoRepository.findById(id);

        if (locacaoOptional.isPresent()) {
            Locacao locacao = locacaoOptional.get();
            locacao.setNome(dto.getNome());
            locacao.setTipo(dto.getTipo());
            locacao.setDescricao(dto.getDescricao());
            locacao.setValorHora(dto.getValorHora());
            locacao.setTempoMinimo(dto.getTempoMinimo());
            locacao.setTempoMaximo(dto.getTempoMaximo());
            locacao.setDataCriacao(dto.getDataCriacao());

            Locacao locacaoAtualizada = locacaoRepository.save(locacao);
            return ResponseEntity.ok(toDTO(locacaoAtualizada));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarLocacao(@PathVariable Long id) {
        if (locacaoRepository.existsById(id)) {
            locacaoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
