import { Component, inject } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ContratoModule } from '../../../models/contrato/contrato.module';
import { ContratoService } from '../../../services/contrato.service';
import { Apartamento } from '../../../models/apartamento';
import { ApartamentoService } from '../../../services/apartamento.service';

@Component({
  selector: 'app-clientedetails',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './clientedetails.component.html',
  styleUrl: './clientedetails.component.scss'
})
export class ClientedetailsComponent {
  
  router = inject(Router);
  
  cliente = new Cliente();
  clienteService = inject(ClienteService);
  listac: Cliente [] = [];

  contrato = new ContratoModule();
  contratoService = inject(ContratoService);

  apartamentoService = inject(ApartamentoService);
  lista: Apartamento [] = [];
  
  mostrarContrato: boolean = false;

  constructor(){
    this.setDefaultIdentificador();

    this.contrato.ap = new Apartamento();
    this.contrato.ap.aparnum = 0;
    this.listAll();
  }

  save(callback?: () => void) {
  this.clienteService.save(this.cliente).subscribe({
    next: retorno => {
      if (this.mostrarContrato === false) {
        Swal.fire({
          title: 'Cliente salvo com sucesso!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/sistema/cliente']);
      }

      if (callback) {
        callback(); // chama a função passada (como atualizar a lista)
      }
    },
    error: erro => {
      Swal.fire({
        title: 'Erro ao salvar cliente',
        icon: 'error',
        text: 'Informações incompletas',
        showConfirmButton: true
      });
      console.log(erro);
    }
  });
}


  salvaDepoisContratos(){
    this.mostrarContrato = true;
    this.save(() => this.listAll());
  }

  saveContrato(){
    this.contratoService.save(this.contrato).subscribe({
          next: retorno => {
            Swal.fire({
              title: 'contrato salvo com sucesso!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/sistema/contrato']);
          },
          
          error: erro => {
            alert('Erro ao salvar contrato');
            console.log(erro);
          }
        });
      }
   

  setDefaultIdentificador() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    this.contrato.identificador = `${day}${month}${year}-${hours}${minutes}`;
}


  listAll() {
    // Carregar lista de apartamentos
    this.apartamentoService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        if(erro.status != 403){
        alert('Erro ao carregar lista de apartamentos');
        console.error(erro);
      }}
    });
  
    // Carregar lista de clientes
    this.clienteService.listAll().subscribe({
      next: listac => {
        this.listac = listac;
      },
      error: erro => {
        alert('Erro ao carregar lista de clientes');
        console.error(erro);
      }
    });
  }
}
