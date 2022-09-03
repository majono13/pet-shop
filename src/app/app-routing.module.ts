import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './main/home/home.component';
import { BrinquedosComponent } from './main/brinquedos/brinquedos.component';
import { AlimentacaoComponent } from './main/alimentacao/alimentacao.component';
import { DiversosComponent } from './main/diversos/diversos.component';
import { ContatoComponent } from './main/contato/contato.component';
import { LoginComponent } from './aut/login/login.component';
import { RegistroComponent } from './aut/registro/registro.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { AutGuard } from './aut/aut-guard.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'brinquedos', component: BrinquedosComponent },
  { path: 'alimentacao', component: AlimentacaoComponent },
  { path: 'diversos', component: DiversosComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'carrinho', component: CarrinhoComponent, canActivate: [AutGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
