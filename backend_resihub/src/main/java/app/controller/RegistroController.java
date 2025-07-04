package app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.entity.Registro;
import app.service.RegistroService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/register")
@CrossOrigin("*")
public class RegistroController {

	@Autowired
	private RegistroService registroService;
	
	@PostMapping
	public ResponseEntity<String> save(@Valid @RequestBody Registro registro) {
	    try {
	        String mensagem = this.registroService.save(registro);
	        return new ResponseEntity<>(mensagem, HttpStatus.CREATED);
	    } catch (Exception e) {
	        return new ResponseEntity<>("Erro: " + e.getMessage(), HttpStatus.BAD_REQUEST);
	    }
	}
	
}
