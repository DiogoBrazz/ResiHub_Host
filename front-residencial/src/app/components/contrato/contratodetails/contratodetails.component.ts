import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApartamentoService } from '../../../services/apartamento.service';
import { Apartamento } from '../../../models/apartamento';
import { ContratoService } from '../../../services/contrato.service';
import { ContratoModule } from '../../../models/contrato/contrato.module';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contratodetails',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './contratodetails.component.html',
  styleUrl: './contratodetails.component.scss'
})
export class ContratodetailsComponent {
 
  contrato = new ContratoModule();
  contratoService = inject(ContratoService);
  router = inject(Router);
  apartamentoService = inject(ApartamentoService);
  lista: Apartamento [] = [];
  clienteService = inject(ClienteService);
  listac: Cliente [] = [];
  router2 = inject(ActivatedRoute);
  modoEdicao = false;

  constructor(){
    this.contrato.ap = new Apartamento();
    this.contrato.ap.aparnum = 0;
    this.listAll();

    this.contrato.cliente = new Cliente();
    this.listAll();

    let id = this.router2.snapshot.params['id'];
    if(id > 0){
        this.findById(id);
        this.modoEdicao = true;
    } else {
        this.modoEdicao = false;
    }

    this.setDefaultIdentificador(); // Chama a função para definir o identificador
}

  findById(id:number){
    this.contratoService.findById(id).subscribe({
      next: retorno => {
        this.contrato = retorno;
      },
      error: erro => {
        Swal.fire({
          title: 'Falha ao carregar lista de contratos',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
        console.log(erro);
      }
    });
  }


  listAll() {
    // Carregar lista de apartamentos
    this.apartamentoService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        alert('Erro ao carregar lista de apartamentos');
        console.error(erro);
      }
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
  

  save(){
    console.log(this.contrato);
    
    if(this.modoEdicao){
      this.contratoService.update(this.contrato, this.contrato.id).subscribe({
        next: retorno => {
          Swal.fire({
            title: 'contrato alterado com sucesso!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/sistema/contrato']);
        },
        error: erro => {
          alert('Erro edit');
          console.log(erro);
        }
      });
    } else {
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


}
