package app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import app.entity.Contrato;
import app.service.contratoService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestParam;


@Validated
@RestController
@RequestMapping("/api/contrato")
@CrossOrigin("*")
public class ContratoController {

	@Autowired
	private contratoService service;

	@PostMapping("/save")
	public ResponseEntity<String> save(@Valid @RequestBody Contrato contrato) {

		try {

			String mensagem = this.service.save(contrato);
			return new ResponseEntity<String>(mensagem, HttpStatus.CREATED);

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<String>("erro: "+e.getMessage(), HttpStatus.BAD_REQUEST);

		}
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<String> update(@Valid @RequestBody Contrato contrato, @PathVariable long id) {

		try {

			String mensagem = this.service.update(contrato, id);
			return new ResponseEntity<String>(mensagem, HttpStatus.OK);

		} catch (Exception e) {

			return new ResponseEntity<String>("erro: "+e.getMessage(), HttpStatus.BAD_REQUEST);

		}

	}
	
	@PutMapping("/arquivar/{id}")
	public ResponseEntity<String> arquivar(@Valid @RequestBody Contrato contrato, @PathVariable long id) {
		try {

			String mensagem = this.service.arquivar(contrato, id);
			return new ResponseEntity<String>(mensagem, HttpStatus.OK);

		} catch (Exception e) {

			return new ResponseEntity<String>("erro: "+e.getMessage(), HttpStatus.BAD_REQUEST);

		}
		
	}

	@DeleteMapping("/delete/{idContrato}")
	public ResponseEntity<String> delete(@PathVariable long id){

		try {

			String mensagem = this.service.delete(id);
			return new ResponseEntity<>(mensagem, HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<String>("erro: "+e.getMessage(), HttpStatus.BAD_REQUEST);
		}

	}

	@GetMapping("/listAll")
	public ResponseEntity<List<Contrato>> listAll (){

		try {

			List<Contrato> lista = this.service.listAll();
			return new ResponseEntity<>(lista, HttpStatus.OK);

		} catch (Exception e) {

			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

		}

	}

	@GetMapping("/findById/{idContrato}")
	public ResponseEntity<Contrato> findById(@PathVariable long id){

		try {

			Contrato contrato = this.service.findById(id);
			return new ResponseEntity<>(contrato, HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}

	}


	@GetMapping("/findbyidenti")
	public ResponseEntity<List<Contrato>> findByIdentificador (@RequestParam String identificador){

		try {

			List<Contrato> lista = this.service.findByIdentificador(identificador);
			return new ResponseEntity<>(lista, HttpStatus.OK);

		} catch (Exception e) {

			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

		}

	}
	
	
	
	
}
