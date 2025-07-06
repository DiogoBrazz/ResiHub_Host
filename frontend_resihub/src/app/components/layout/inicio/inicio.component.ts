import { Component, inject } from '@angular/core';
import { Apartamento } from '../../../models/apartamento';
import { ApartamentoService } from '../../../services/apartamento.service';
import Swal from 'sweetalert2';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

  totalAp: number = 0;
  livres: number = 0;
  ocupados: number = 0;
  totalClientes: number = 0;

  listaAp: Apartamento[] = [];
  listaCliente: Cliente[] = [];
  apartamentoService = inject(ApartamentoService);
  clienteService = inject(ClienteService);

  constructor(){
    this.listApartamentos(); 
    this.listClientes();
  }

  listApartamentos(){
    this.apartamentoService.listAll().subscribe({
      next: lista => {
        this.listaAp = lista;
        this.totalAp = lista.length;
        this.livres = lista.filter(a => a.status === 'Livre').length;
        this.ocupados = lista.filter(a => a.status != 'Livre').length;
      },
      error: erro => {
      if(erro.status != 403){
      Swal.fire({
        title: 'Erro ao carregar total de apartamentos!',
        icon: 'warning',
        showConfirmButton: false,
        timer: 2500
      });
      console.log(erro);
    }}
    });
  
  }

  get porcentagemOcupados(): number {
    if (this.totalAp === 0) return 0;
      return Math.round((this.ocupados / this.totalAp) * 100);
  }


  listClientes(){
    this.clienteService.listAll().subscribe({
      next: lista=> {
        this.listaCliente = lista;
        this.totalClientes = lista.length;
      },
      error: erro => {
      if(erro.status != 403){
      Swal.fire({
        title: 'Erro ao carregar total de clientes!',
        icon: 'warning',
        showConfirmButton: false,
        timer: 2500
      });
      console.log(erro);
    }}
    });
  }

}
