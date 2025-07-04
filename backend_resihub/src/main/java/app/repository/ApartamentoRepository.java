package app.repository;


import org.springframework.data.jpa.repository.JpaRepository;


import app.entity.Apartamento;

public interface ApartamentoRepository extends JpaRepository<Apartamento, Integer>{

}