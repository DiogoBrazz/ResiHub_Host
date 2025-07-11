import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Apartamento } from '../../../models/apartamento';
import { ApartamentoService } from '../../../services/apartamento.service';
import Swal from 'sweetalert2';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { ContratoService } from '../../../services/contrato.service';
import { ContratoModule } from '../../../models/contrato/contrato.module';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-apartamentolist',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './apartamentolist.component.html',
  styleUrl: './apartamentolist.component.scss',
  providers: [DatePipe]
})


export class ApartamentolistComponent {
  
  lista: Apartamento[] = [];
  apartamentoService = inject(ApartamentoService);
  router = inject(Router);
  datePipe = inject(DatePipe);

  listaCliente: Cliente[] = [];
  clienteService = inject(ClienteService);
  contratoService = inject(ContratoService);
  listacontrato: ContratoModule[] = [];


  constructor(){
    this.listAll(); 
    this.loadClientes();
    this.loadContratos();
  }

  listAll(){
    this.apartamentoService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        if(erro.status != 403){
        Swal.fire({
          title: 'Erro ao carregar lista de apartamentos!',
          icon: 'warning',
          showConfirmButton: false,
          timer: 2500,
          customClass: {
            popup: 'swal2-popup'
          }
        });
        }
        console.log(erro);
      }
    });
  }

  loadClientes() {
    this.clienteService.listAll().subscribe({
      next: clientes => {
        this.listaCliente = clientes;
      },
      error: erro => {
        console.log(erro)
      }
    });
  }

  loadContratos() {
    this.contratoService.listAll().subscribe({
      next: contratos => {
        this.listacontrato = contratos;
      },
      error: erro => {
        console.error('Erro ao carregar contratos:', erro);
      }
    });
  }

  getClienteByAparnum(aparnum: number): Cliente | undefined {
    return this.listaCliente.find(cliente => 
      cliente.contratos?.some(contrato => contrato.ap?.aparnum === aparnum)
    );
  }


  deletar(apartamento: Apartamento) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este apartamento?',
      text: "Você não poderá reverter esta ação!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apartamentoService.delete(apartamento.aparnum).subscribe({
          next: retorno => {
            Swal.fire({
              title: 'Apartamento deletado com sucesso!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            });
            this.listAll();
          },
          error: erro => {
            Swal.fire({
              title: 'Erro ao deletar apartamento',
              icon: 'error',
              text: 'O apartamento esta ocupado!',
              showConfirmButton: true
            });
            console.log(erro);
          }
        });
      }
    });
  }


getStatusParaApartamento(aparnum: number): string {
  const hoje = new Date();
  const hojeNormalizado = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

  // Encontra um contrato ativo para o apartamento específico
  const contratoAtivo = this.listacontrato.find(contrato => {
    // Verifica se o contrato pertence ao apartamento correto
    if (contrato.ap?.aparnum !== aparnum) {
      return false;
    }

    // Corrige as datas do contrato para o fuso horário local
    const startDateUTC = new Date(contrato.entrada);
    const startDate = new Date(startDateUTC.getTime() + startDateUTC.getTimezoneOffset() * 60000);

    const endDateUTC = new Date(contrato.saida);
    const endDate = new Date(endDateUTC.getTime() + endDateUTC.getTimezoneOffset() * 60000);

    // Retorna true se a data de hoje estiver dentro do período do contrato
    return hojeNormalizado >= startDate && hojeNormalizado <= endDate;
  });

  // Se encontrou um contrato ativo, o status é 'Ocupado', senão é 'Livre'
  return contratoAtivo ? 'Ocupado' : 'Livre';
}


getInquilinoNome(apartamento: Apartamento): string {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    // 1. Encontra o contrato ATIVO para este apartamento (mesma lógica que já usamos)
    const contratoAtivo = this.listacontrato.find(contrato => {
        if (contrato.ap?.aparnum !== apartamento.aparnum) {
            return false;
        }
        const entradaUTC = new Date(contrato.entrada);
        const entrada = new Date(entradaUTC.getUTCFullYear(), entradaUTC.getUTCMonth(), entradaUTC.getUTCDate());

        const saidaUTC = new Date(contrato.saida);
        const saida = new Date(saidaUTC.getUTCFullYear(), saidaUTC.getUTCMonth(), saidaUTC.getUTCDate());

        return hoje >= entrada && hoje <= saida;
    });

    // 2. Se não houver contrato ativo, o apartamento está vago.
    if (!contratoAtivo) {
        return '-';
    }

    // 3. Se encontrou um contrato, procure o cliente dono desse contrato.
    //    Estou assumindo que o Cliente tem uma lista de seus contratos.
    const clienteDoContrato = this.listaCliente.find(cliente => 
        cliente.contratos?.some(c => c.id === contratoAtivo.id) // Compara pelo ID do contrato para ser preciso
    );
    
    // 4. Retorna o nome do cliente ou uma mensagem padrão.
    return clienteDoContrato ? clienteDoContrato.nome : 'Cliente não encontrado';
}


// Substitua a função inteira por esta versão atualizada

getObservacaoParaApartamento(apartamento: Apartamento): { texto: string, cor: string } {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Normaliza para o início do dia

    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1); // Define a data para amanhã

    // 1. Encontrar o contrato ativo para este apartamento
    const contratoAtivo = this.listacontrato.find(contrato => {
        if (contrato.ap?.aparnum !== apartamento.aparnum) {
            return false;
        }
        // Normaliza as datas do contrato para evitar problemas com fuso horário
        const entradaUTC = new Date(contrato.entrada);
        const entrada = new Date(entradaUTC.getUTCFullYear(), entradaUTC.getUTCMonth(), entradaUTC.getUTCDate());

        const saidaUTC = new Date(contrato.saida);
        const saida = new Date(saidaUTC.getUTCFullYear(), saidaUTC.getUTCMonth(), saidaUTC.getUTCDate());

        return hoje >= entrada && hoje <= saida;
    });

    // 2. Se existe um contrato ativo...
    if (contratoAtivo) {
        const saidaUTC = new Date(contratoAtivo.saida);
        const saida = new Date(saidaUTC.getUTCFullYear(), saidaUTC.getUTCMonth(), saidaUTC.getUTCDate());

        // --- INÍCIO DA MODIFICAÇÃO ---

        // NOVO: Primeiro, verifica se a data de saída é HOJE
        if (saida.getTime() === hoje.getTime()) {
            return { texto: 'Contrato vence hoje', cor: 'red' };
        
        // Depois, verifica se a data de saída é AMANHÃ
        } else if (saida.getTime() === amanha.getTime()) {
            return { texto: 'Contrato vence amanhã', cor: '#E09D00' };

        // Se não for nenhum dos dois, mostra a data normal
        } else {
            const dataFormatada = this.datePipe.transform(saidaUTC, 'dd/MM/yyyy', 'UTC');
            return { texto: `Contrato até dia ${dataFormatada}`, cor: 'inherit' };
        }
        // --- FIM DA MODIFICAÇÃO ---

    } else {
        // 3. Se não há contrato ativo, verificar se há um começando amanhã
        const contratoFuturo = this.listacontrato.find(contrato => {
            if (contrato.ap?.aparnum !== apartamento.aparnum) {
                return false;
            }
            const entradaUTC = new Date(contrato.entrada);
            const entrada = new Date(entradaUTC.getUTCFullYear(), entradaUTC.getUTCMonth(), entradaUTC.getUTCDate());
            
            return entrada.getTime() === amanha.getTime();
        });

        if (contratoFuturo) {
            return { texto: 'Inquilino com data de entrada para amanhã', cor: 'green' };
        }
    }

    // 4. Se nenhuma das condições acima for atendida, retorna vazio
    return { texto: '', cor: 'inherit' };
}
  
}

