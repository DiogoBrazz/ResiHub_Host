package app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

import app.entity.Apartamento;
import app.service.ApartamentoService;
import jakarta.validation.Valid;

@Validated
@RestController
@RequestMapping("/api/apartamento")
@CrossOrigin("*")
public class ApartamentoController {
	@Autowired
	private ApartamentoService apartamentoService;
		
	@PreAuthorize("hasRole('admin')")
	@PostMapping("/save")
	public ResponseEntity<String> save(@Valid @RequestBody Apartamento apartamento){
		try {
			String menssagem = this.apartamentoService.save(apartamento);
			return new ResponseEntity<String>(menssagem, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<String>("Erro encontrado!: "+e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	
	@PreAuthorize("hasRole('admin')")
	@PutMapping("/update/{Aparnum}")
	public ResponseEntity<String> update(@Valid @RequestBody Apartamento apartamento, @PathVariable int Aparnum){
		try {
			String menssagem = this.apartamentoService.update(Aparnum, apartamento);
			return new ResponseEntity<String>(menssagem, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<String>("Erro encontrado!: "+e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	
	@PreAuthorize("hasRole('admin')")
	@GetMapping("/listAll")
	public ResponseEntity<List<Apartamento>> listAll(){
		try {
			List<Apartamento> lista = this.apartamentoService.listAll();
			return new ResponseEntity<>(lista, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	@PreAuthorize("isAuthenticated()") 
	@GetMapping("/findById/{Aparnum}")
	public ResponseEntity<Apartamento> findById(@PathVariable int Aparnum){
		try {
			Apartamento apartamento = this.apartamentoService.findById(Aparnum);
			return new ResponseEntity<>(apartamento, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PreAuthorize("hasRole('admin')")
	@DeleteMapping("/delete/{Aparnum}")
	public ResponseEntity<String> delete(@PathVariable int Aparnum){
		try {
			String menssagem = this.apartamentoService.delete(Aparnum);
			return new ResponseEntity<>(menssagem, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Erro encontrado!: "+e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	

}