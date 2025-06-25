import { Component, Inject, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ContratoModule } from '../../../models/contrato/contrato.module';
import { ContratoService } from '../../../services/contrato.service';



@Component({
  selector: 'app-contratolist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contratolist.component.html',
  styleUrl: './contratolist.component.scss'
})
export class ContratolistComponent {
  lista: ContratoModule[] = [];
  contratoService = inject(ContratoService);
  router = Inject(Router);

  arquivados: boolean = false;


  constructor(){
    this.listAll(); 
  }

  listAll(){
    this.contratoService.listAll().subscribe({
      next: lista => {
       this.lista = lista;
      },
      error: erro => {
        Swal.fire({
          title: 'Erro ao carregar lista de contratos!',
          icon: 'warning',
          showConfirmButton: false,
          timer: 2500,
          customClass: {
            popup: 'swal2-popup'
          }
        });
        console.log(erro);
      }
    });
  }

  arquivar(contrato: ContratoModule){

    Swal.fire({
      title: 'Tem certeza que deseja arquivar este contrato?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, arquivar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
    this.contratoService.arquivar(contrato, contrato.id).subscribe({
      next: retorno => {
        Swal.fire({
          title: 'contrato arquivado com sucesso!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        this.listAll();
        this.router.navigate(['/sistema/contrato']);
      },
      error: erro => {
        Swal.fire({
          title: 'Erro ao arquivar contrato contrato',
          icon: 'error',
          text: 'O contrato não pode ser arquivado!',
          showConfirmButton: true
        });
        console.log(erro);
      }
    });
  }
});
}

  deletar(contrato: ContratoModule) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este contrato?',
      text: "Você não poderá reverter esta ação!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contratoService.delete(contrato.id).subscribe({
          next: retorno => {
            Swal.fire({
              title: 'contrato deletado com sucesso!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            });
            this.listAll();
          },
          error: erro => {
            Swal.fire({
              title: 'Erro ao deletar contrato',
              icon: 'error',
              text: 'O contrato tem um cliente!',
              showConfirmButton: true
            });
            console.log(erro);
          }
        });
      }
    });
  }

}
