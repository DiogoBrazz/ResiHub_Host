package app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.entity.Apartamento;
import app.entity.Contrato;
import app.repository.ApartamentoRepository;
import app.repository.ContratoRepository;


@Service
public class contratoService {

	@Autowired
	private ContratoRepository repository;
	@Autowired
	private ApartamentoRepository aprepository;
	
	public String save (Contrato contrato) {
		
		Apartamento ap= aprepository.findById(contrato.getAp().getAparnum()).get();
		ap.setStatus(contrato.getCliente().getNome());
		aprepository.save(ap);		
		contrato.setAp(ap);
		
		contrato.setStatus(true);
		this.repository.save(contrato);

		return contrato.getId()+ "contrato salvo";
	}
	
	public String update(Contrato contrato, long id) {
		contrato.setId(id);
		this.repository.save(contrato);
		return contrato.getId()+ "atualizações salvas";
	}
	
	public String delete (long id) {
		this.repository.deleteById(id);
		return "contrato deletado";
	}
	public String arquivar(Contrato contrato, long id) {
			
		contrato.setId(id);
		contrato.setStatus(false);
		this.repository.save(contrato);
		
		Apartamento ap = contrato.getAp();
		ap.setStatus("Livre");
		
		aprepository.save(ap);
		
		
		return contrato.getId()+ "Arquivado com sucesso";
	}
	
	public List<Contrato> listAll(){
		return this.repository.findAll();
	}
	
	public 	Contrato findById(long id) {
		Contrato contrato = this.repository.findById(id).get();
		return contrato;
	}
	
	public List<Contrato> findByIdentificador(String identificador) {
		return this.repository.findByIdentificador(identificador);
		
	}
	

    
}
