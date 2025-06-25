import { Component, inject } from '@angular/core';
import { Register } from '../../../auth/register';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegisterService } from '../../../auth/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  register: Register = new Register();
  registerService = inject(RegisterService);
  router = inject(Router);

  confirmPassword: string = '';

  registrar() {

    //=====================================VERIFICA SE HÁ CAMPO VAZIO================================================//

    if (!this.register.username || !this.register.password || !this.confirmPassword || !this.register.role) {
      Swal.fire({
        title: 'Preencha todos os campos!',
        icon: 'error',
        showConfirmButton: false,
        timer: 1200,
        customClass: {
          popup: 'swal2-popup'
        }
      });
      return; 
    }

    //=======================================VERIFICA SE AS SENHAS SÃO IGUAIS==============================================//

    if (this.register.password !== this.confirmPassword) {
      Swal.fire({
              title: 'As senhas não coincidem!',
              icon: 'error',
              showConfirmButton: false,
              timer: 1200,
              customClass: {
                popup: 'swal2-popup'
              }
            });
      return;
    }

    //==========================================================================================================//


    this.registerService.register(this.register).subscribe({
      next: (resposta) => {
        // Sucesso! (Resposta do backend)
        Swal.fire({title: 'Registrado com sucesso!', icon: 'success', showConfirmButton: false, timer: 1200,
          customClass: {
            popup: 'swal2-popup'
          }
        });
        this.router.navigate(['/login']); // Redireciona para login
      },
      error: (erro) => {
        // Trata erros (ex.: usuário já existe)
        Swal.fire({title: 'Erro no registro', icon: 'error', showConfirmButton: false, timer: 1200,
          customClass: {
            popup: 'swal2-popup'
          }
        });
      }
    });

  }
}
