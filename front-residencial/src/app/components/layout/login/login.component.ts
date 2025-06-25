import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Login } from '../../../auth/login';
import { LoginService } from '../../../auth/login.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  login: Login = new Login();
  loginService= inject(LoginService);
  router = inject(Router);

  constructor(){
    this.loginService.removerToken();
  }


  logar() {
    this.loginService.logar(this.login).subscribe({
      next: token => { // QUANDO DÁ CERTO
      if(token){
        this.loginService.addToken(token);
        this.router.navigate(['sistema/dashboard']);
      }                  
    }, error: erro => { 
      Swal.fire({
        title: 'Credenciais Inválidas!',
        icon: 'error',
        showConfirmButton: false,
        timer: 1200,
        customClass: {
          popup: 'swal2-popup'
        }
      });
    }
  });
}

}
