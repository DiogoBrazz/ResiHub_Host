import { Apartamento } from "../apartamento";
import { Cliente } from "../cliente";


export class ContratoModule { 
  id!: number;
  identificador!: string;
  cliente!: Cliente;
  ap!: Apartamento;
  valor_condominio!: number;
  valor_iptu!: number;
  valor_internet!: number;
  valor_aluguel!: number;
  valor_total!: number; 
  status!: boolean;
  entrada!: string;
  saida !: string;

  constructor() {
    this.ap = new Apartamento(); 
    this.cliente = new Cliente();
  }
}

