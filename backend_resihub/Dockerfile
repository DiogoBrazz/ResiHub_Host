# Etapa 1: Build com Maven
FROM maven:3.9.9-eclipse-temurin-17 AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto Maven
COPY . .

# Compila e empacota o projeto
RUN mvn clean package -DskipTests

# Etapa 2: Imagem final
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copia o JAR da build
COPY --from=builder /app/target/backend_resihub-0.0.1-SNAPSHOT.jar app.jar

# Expõe a porta padrão da aplicação Spring Boot
EXPOSE 8080

# Comando de inicialização
CMD ["java", "-jar", "app.jar"]
