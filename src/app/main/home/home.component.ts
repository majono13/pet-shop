import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AutService } from 'src/app/aut/aut.service';

import { Produto } from 'src/app/models/produto.model';
import { ProdutosService } from '../produtos.service';
import { CarrinhoService } from 'src/app/shared/services/carrinho.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  produtos: Produto[] = [];

  private unsubscribe$: Subject<any> = new Subject()



  constructor(private produtosService: ProdutosService, private autService: AutService, private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.getProdutos();
    this.carrinhoService.verificaLogin();
  }

  getProdutos() {
    this.produtosService.getProdutos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (prod) => {
          for (let i in prod) {
            if (prod[i].destaque) this.produtos.push(prod[i]);
          }
        }
      });
  }

  addItemAoCarrinho(p: Produto) {
    this.carrinhoService.addItemAoCarrinho(p)
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }

}
