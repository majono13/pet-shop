import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AutService } from 'src/app/aut/aut.service';
import { ProdutosService } from 'src/app/main/produtos.service';
import { Produto } from 'src/app/models/produto.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: Observable<any>;
  carrinho: Produto[] = [];
  logado: boolean = false;

  constructor(private autService: AutService, private produtosService: ProdutosService, private router: Router) { }

  ngOnInit(): void {
    this.autService.autenticado().subscribe(boolean => this.logado = boolean);
    this.getUser();
  }

  getUser() {
    this.user = this.autService.getUser()

    console.log(this.user)
  }

  produtosCarrinho() {

    console.log(this.user)
  }

  menuMobile() {
    const menu = document.querySelector('.menu') as HTMLDivElement;

    menu.addEventListener('click', () => {
      if (menu.className === 'menu') {
        menu.className += ' menu-mobile';
      } else {
        menu.className = 'menu';
      }
    })
  }

  logout() {
    this.autService.logout();
  }

}
