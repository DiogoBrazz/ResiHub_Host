import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-clienteinfo',
  templateUrl: './clienteinfo.component.html',
  styleUrls: ['./clienteinfo.component.scss'],
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
})

export class ClienteinfoComponent implements OnInit {

  cliente: Cliente = new Cliente();
  clienteService = inject(ClienteService);
  route = inject(ActivatedRoute);


  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.findById(id);
  }

  findById(id: number): void {
    this.clienteService.findById(id).subscribe({
      next: retorno => {
        this.cliente = retorno;
        if (!this.cliente.contratos) {
          this.cliente.contratos = []; // segurança extra
        }
        this.cliente.contratos.reverse();
      },
      error: erro => {
        Swal.fire({
          title: 'Erro ao carregar cliente',
          icon: 'error',
          timer: 1500
        });
        console.error(erro);
      }
    });
  }

  public openedPopoverIndex: number | null = null;

  toggleDetailsPopover(index: number): void {
    if (this.openedPopoverIndex === index) {
      // Se o popover clicado já está aberto, fecha ele
      this.openedPopoverIndex = null;
    } else {
      // Abre o popover clicado
      this.openedPopoverIndex = index;
    }
  }
}
