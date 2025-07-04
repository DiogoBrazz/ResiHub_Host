package app.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
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
public class Cliente {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotBlank(message = "campo vazio")
	private String nome;
	
	@NotNull
	private Long cpf;
	
	@NotNull
	private Long rg;
	
	@NotNull
	private Long telefone;
	
	@NotBlank(message = "campo vazio")
	private String profissao;
	
	@NotBlank(message = "campo vazio")
	private String email;
	
	@NotBlank(message = "campo vazio")
	private String nascimento;

	private String rua;

	private Long casaNumero;

	private String bairro;

	private String cidade;

	private String estado;

	private Long cep;

	@OneToMany(mappedBy = "cliente")	
	@JsonIgnoreProperties("cliente")
	private List<Contrato> contratos;
	
	
	//getters e setters
//--------------------------------------------------------------------
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}

	public Long getCpf() {
		return cpf;
	}
	public void setCpf(long cpf) {
	    if(cpf < 0){
	      throw new IllegalArgumentException("cpf não pode ser número negativo");
	    }
		this.cpf = cpf;
	}
	
	public Long getRg() {
		return rg;
	}
	public void setRg(long rg) { 
	    if(rg < 0){
	      throw new IllegalArgumentException("rg não pode ser número negativo");
	    }
			this.rg = rg;
		}
	
	public Long getTelefone() {
		return telefone;
	}
	public void setTelefone(long telefone) {
	    if(telefone < 0){
	      throw new IllegalArgumentException("telefone não pode ser número negativo");
	    }
			this.telefone = telefone;
		}
	
	public String getProfissao() {
		return profissao;
	}
	public void setProfissao(String profissao) {
		this.profissao = profissao;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getNascimento() {
		return nascimento;
	}

	public void setNascimento(String nascimento) {
		this.nascimento = nascimento;
	}

	public String getRua() {
    return rua;
	}

	public void setRua(String rua) {
		this.rua = rua;
	}

	public Long getCasaNumero() {
		return casaNumero;
	}

	public void setCasaNumero(Long casaNumero) {
		this.casaNumero = casaNumero;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Long getCep() {
		return cep;
	}

	public void setCep(Long cep) {
		this.cep = cep;
	}

	public List<Contrato> getContratos() {
		return contratos;
	}
	public void setContratos(List<Contrato> contratos) {
		this.contratos = contratos;
	}
	
	
}

