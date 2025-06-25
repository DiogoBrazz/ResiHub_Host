package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import app.entity.Registro;

public interface RegistroRepository extends JpaRepository<Registro, Long> {
    // Métodos customizados (se necessário)
    boolean existsByUsername(String username); // Para verificar se usuário já existe
}