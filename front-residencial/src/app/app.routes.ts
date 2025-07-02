import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { ApartamentolistComponent } from './components/apartamento/apartamentolist/apartamentolist.component';
import { ApartamentodetailsComponent } from './components/apartamento/apartamentodetails/apartamentodetails.component';
import { ClientelistComponent } from './components/cliente/clientelist/clientelist.component';
import { InicioComponent } from './components/layout/inicio/inicio.component';
import { ClientedetailsComponent } from './components/cliente/clientedetails/clientedetails.component';
import { ClienteinfoComponent } from './components/cliente/clienteinfo/clienteinfo.component';
import { NgModule } from '@angular/core';
import { ContratolistComponent } from './components/contrato/contratolist/contratolist.component';
import { ContratodetailsComponent } from './components/contrato/contratodetails/contratodetails.component';
import { RegisterComponent } from './components/layout/register/register.component';
import { ApartamentoinfoComponent } from './components/apartamento/apartamentoinfo/apartamentoinfo.component';



export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "sistema", component: PrincipalComponent, children: [

        {path: "dashboard", component: InicioComponent},
        {path: "apartamento", component: ApartamentolistComponent},
        {path: "apartamento/new", component: ApartamentodetailsComponent},
        {path: "apartamento/:id", component: ApartamentoinfoComponent},
        {path: "apartamento/edit/:id", component: ApartamentodetailsComponent},
        {path: "cliente", component:ClientelistComponent},
        {path: "cliente/new", component:ClientedetailsComponent},
        {path: "cliente/:id", component:ClienteinfoComponent},
        {path: "contrato", component:ContratolistComponent},
        {path: "contrato/new",component:ContratodetailsComponent},
 
        ]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }


