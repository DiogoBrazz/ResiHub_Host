import { ContratoModule } from "./contrato/contrato.module";

export class Cliente {
    id!: number;
    nome!: string;
    entrada!: string;
    nascimento!: string;
    cpf!: number; 
    rg!: number; 
    telefone!: number; 
    profissao!: string;
    email!: string;
    
    rua!: string;
    casaNumero!: number;
    bairro!: string;
    cidade!: string;
    estado!: string;
    cep!: number;

    contratos: ContratoModule[] = [];
}
