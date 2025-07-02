package app.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Contrato {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String identificador;
	
	private Double valor_condominio;
	
	private Double valor_iptu;
	
	private Double valor_internet;
	
	private Double valor_aluguel;
	
	private String entrada;

	private String saida;
	
	private boolean status;
	
	@NotNull
	@ManyToOne
	@JsonIgnoreProperties("contratos")
	private Cliente cliente;
	
	@NotNull
	@ManyToOne
	@JsonIgnoreProperties("contratos") 
	private Apartamento ap;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIdentificador() {
		return identificador;
	}

	public void setIdentificador(String identificador) {
		this.identificador = identificador;
	}

	public Double getValor_condominio() {
		return valor_condominio;
	}

	public void setValor_condominio(Double valor_condominio) {
		this.valor_condominio = valor_condominio;
	}

	public Double getValor_iptu() {
		return valor_iptu;
	}

	public void setValor_iptu(Double valor_iptu) {
		this.valor_iptu = valor_iptu;
	}

	public Double getValor_internet() {
		return valor_internet;
	}

	public void setValor_internet(Double valor_internet) {
		this.valor_internet = valor_internet;
	}

	public Double getValor_aluguel() {
		return valor_aluguel;
	}

	public void setValor_aluguel(Double valor_aluguel) {
		this.valor_aluguel = valor_aluguel;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Apartamento getAp() {
		return ap;
	}

	public void setAp(Apartamento ap) {
		this.ap = ap;
	}
	
	public String getEntrada() {
		return entrada;
	}

	public void setEntrada(String entrada) {
		this.entrada = entrada;
	}

	public String getSaida() {
		return saida;
	}

	public void setSaida(String saida) {
		this.saida = saida;
	}



}
