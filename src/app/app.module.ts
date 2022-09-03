import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

/***** Firebase imports ******/
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { environment } from 'src/environments/environment';
import { BrinquedosComponent } from './main/brinquedos/brinquedos.component';
import { AlimentacaoComponent } from './main/alimentacao/alimentacao.component';
import { DiversosComponent } from './main/diversos/diversos.component';
import { ContatoComponent } from './main/contato/contato.component';
import { AutComponent } from './aut/aut.component';
import { LoginComponent } from './aut/login/login.component';
import { RegistroComponent } from './aut/registro/registro.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    MainComponent,
    HomeComponent,
    BrinquedosComponent,
    AlimentacaoComponent,
    DiversosComponent,
    ContatoComponent,
    AutComponent,
    LoginComponent,
    RegistroComponent,
    CarrinhoComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
