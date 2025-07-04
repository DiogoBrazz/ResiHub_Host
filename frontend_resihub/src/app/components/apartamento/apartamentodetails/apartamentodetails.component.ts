import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApartamentoService } from '../../../services/apartamento.service';
import { Apartamento } from '../../../models/apartamento';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-apartamentodetails',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './apartamentodetails.component.html',
  styleUrl: './apartamentodetails.component.scss'
})

export class ApartamentodetailsComponent {

  apartamento = new Apartamento();
  router = inject(Router);
  apartamentoService = inject(ApartamentoService);
  router2 = inject(ActivatedRoute);
  modoEdicao = false;

  constructor() { 
    let id = this.router2.snapshot.params['id'];
    if(id > 0){
      this.findByAparNum(id);
      this.modoEdicao = true;
    } else {
      this.modoEdicao = false;
    }
  }

  findByAparNum(id:number){
    this.apartamentoService.findByAparNum(id).subscribe({
      next: retorno => {
        this.apartamento = retorno;
      },
      error: erro => {
        Swal.fire({
          title: 'Falha ao carregar lista de apartamentos',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
        console.log(erro);
      }
    });
  }

  save(){
    if(this.modoEdicao){
      this.apartamentoService.update(this.apartamento, this.apartamento.aparnum).subscribe({
        next: retorno => {
          Swal.fire({
            title: 'Apartamento alterado com sucesso!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/sistema/apartamento']);
        },
        error: erro => {
          alert('Erro');
          console.log(erro);
        }
      });
    } else {
      this.apartamentoService.save(this.apartamento).subscribe({
        next: retorno => {
          Swal.fire({
            title: 'Apartamento salvo com sucesso!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/sistema/apartamento']);
        },
        error: erro => {
          alert('Erro');
          console.log(erro);
        }
      });
    }
  }

}

