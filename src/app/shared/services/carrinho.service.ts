import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { AutService } from 'src/app/aut/aut.service';
import { Produto } from 'src/app/models/produto.model';

import { User } from '../../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  user: User;
  logado: boolean;
  unsubscribe$: Subject<any> = new Subject();

  constructor(private autService: AutService, private router: Router) { }

  verificaLogin() {
    this.autService.autenticado()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(boolean => this.logado = boolean);
  }

  addItemAoCarrinho(p: Produto) {
    if (this.logado) {
      this.autService.getUser()
        .pipe(
          takeUntil(this.unsubscribe$))
        .subscribe(user => {
          this.user = user;
        });
      this.user.carrinho.push(p);
      this.autService.addItemBag(this.user.carrinho, this.user.id);
    }
    else this.router.navigateByUrl('/login');
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }

}
