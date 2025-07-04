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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.entity.Cliente;
import app.service.clienteService;
import jakarta.validation.Valid;

@Validated
@RestController
@RequestMapping("/api/cliente")
@CrossOrigin("*")
public class ClienteController {
	
	@Autowired
    private clienteService service;
	
	 @PostMapping("/save")
	    public ResponseEntity<String> save(@Valid @RequestBody Cliente cliente) {
	        
	        try {
	            
	            String mensagem = this.service.save(cliente);
	            return new ResponseEntity<String>(mensagem, HttpStatus.CREATED);
	            
	        } catch (Exception e) {
	            
	            return new ResponseEntity<String>("erro: "+e.getMessage(), HttpStatus.BAD_REQUEST);
	            
	        }
	        
	    }
	 
	 @PutMapping("/update/{idCliente}")
	    public ResponseEntity<String> update(@Valid @RequestBody Cliente cliente, @PathVariable long idCliente) {
	        
	        try {
	            
	            String mensagem = this.service.update(cliente, idCliente);
	            return new ResponseEntity<String>(mensagem, HttpStatus.OK);
	            
	        } catch (Exception e) {
	            
	            return new ResponseEntity<String>("erro: "+e.getMessage(), HttpStatus.BAD_REQUEST);
	            
	        }
	        
	    }
	 
	 
	 @GetMapping("/listAll")
	    public ResponseEntity<List<Cliente>> listAll (){
	        
	        try {
	            
	            List<Cliente> lista = this.service.listAll();
	            return new ResponseEntity<>(lista, HttpStatus.OK);
	            
	        } catch (Exception e) {
	            
	            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

	        }
	        
	    }
	 
	 @GetMapping("/findById/{idCliente}")
	    public ResponseEntity<Cliente> findById(@PathVariable long idCliente){
	        
	        try {
	            
	            Cliente cliente = this.service.findById(idCliente);
	            return new ResponseEntity<>(cliente, HttpStatus.OK);
	            
	        } catch (Exception e) {
	            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	        }
	        
	    }
	    
	 
	    @DeleteMapping("/delete/{idCliente}")
	    public ResponseEntity<String> delete(@PathVariable long idCliente){
	        
	        try {
	            
	            String mensagem = this.service.delete(idCliente);
	            return new ResponseEntity<>(mensagem, HttpStatus.OK);
	            
	        } catch (Exception e) {
	            return new ResponseEntity<String>("Deu esse erro aqui: "+e.getMessage(), HttpStatus.BAD_REQUEST);
	        }
	        
	    }
	    
	    @GetMapping("/findByNome")
		public ResponseEntity<List<Cliente>> findByNome (@RequestParam String nome){
			
			try {
				
				List<Cliente> lista = this.service.findByNome(nome);
				return new ResponseEntity<>(lista, HttpStatus.OK);
				
			} catch (Exception e) {
				
				return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

			}
			
		}
	    
}

	 

