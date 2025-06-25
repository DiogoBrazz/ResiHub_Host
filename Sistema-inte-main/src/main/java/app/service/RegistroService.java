package app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import app.entity.Registro;
import app.repository.RegistroRepository;

@Service
public class RegistroService {

    @Autowired
    private RegistroRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Para criptografar a senha

    public String save(Registro registro) {
        // 1. Verifica se username já existe
        if (repository.existsByUsername(registro.getUsername())) {
            return "Erro: Usuário já existe!";
        }

        // 2. Criptografa a senha antes de salvar
        registro.setPassword(passwordEncoder.encode(registro.getPassword()));

        // 3. Salva no banco (tabela "usuario")
        repository.save(registro);
        
        return "Usuário registrado com sucesso!";
    }
}