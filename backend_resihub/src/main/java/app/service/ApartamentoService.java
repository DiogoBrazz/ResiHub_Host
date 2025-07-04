package app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.entity.Apartamento;
import app.entity.Contrato;
import app.repository.ApartamentoRepository;
import jakarta.validation.Valid;

@Service
public class ApartamentoService {
	
	@Autowired
	private ApartamentoRepository apartamentoRepository;
	
	public String save(Apartamento apartamento) {
		String status = verificaStatus(apartamento);
		this.apartamentoRepository.save(apartamento);
		 
		return apartamento.getAparnum()+" Salvo com sucesso" + status;
	}
	
	public String verificaStatus(@Valid Apartamento apartamento) {
	    List<Contrato> contratos = apartamento.getContratos();

	    if (contratos == null || contratos.isEmpty()) {
	        apartamento.setStatus("Livre");
	    } else {
	    	    // Encontrar o contrato ativo
	    	    Contrato contratoAtivo = contratos.stream()
	    	            .filter(Contrato::isStatus) 
	    	            .findFirst()               
	    	            .orElse(null);             

	    	    if (contratoAtivo != null && contratoAtivo.getCliente() != null) {
	    	        apartamento.setStatus(contratoAtivo.getCliente().getNome());
	    	    } else {
	    	        apartamento.setStatus("Livre");
	    	    }

	         }

	    return apartamento.getStatus();
	}

	
	
	public String update(int Aparnum, Apartamento apartamento) {
		apartamento.setAparnum(Aparnum);
		this.apartamentoRepository.save(apartamento);
		return " Apartamento alterado com sucesso";
	}
	
	public List<Apartamento> listAll(){
		return this.apartamentoRepository.findAll();
	}
	
	public Apartamento findById(int Aparnum) {
		Apartamento apartamento = this.apartamentoRepository.findById(Aparnum).get();
		return apartamento;
	}
	
	public String delete(int Aparnum) {
		this.apartamentoRepository.deleteById(Aparnum);
		return " Apartamento deletado com sucesso";
	}
	

	

}