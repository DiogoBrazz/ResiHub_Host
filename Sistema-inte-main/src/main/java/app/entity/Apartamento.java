package app.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

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
public class Apartamento {
	@Id
	@NotNull(message = "Este campo não pode ser nulo")
	private int aparnum;

	private int andar;
	
	//@NotBlank
	private String status;
	
	//@NotNull(message = "Este campo não pode ser nulo")
	private String fotos;
	


	@OneToMany(mappedBy = "ap")	
	@JsonIgnoreProperties("ap")
	private List<Contrato> contratos;
	

	public List<Contrato> getContratos() {
		return contratos;
	}

	public void setContratos(List<Contrato> contratos) {
		this.contratos = contratos;
	}


	public int getAparnum() {
		return aparnum;
	}

	public void setAparnum(int aparnum) {
		this.aparnum = aparnum;
	}

	public int getAndar() {
		return andar;
	}

	public void setAndar(int andar) {
		this.andar = andar;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getFotos() {
		return fotos;
	}

	public void setFotos(String fotos) {
		this.fotos = fotos;
	}

	
}