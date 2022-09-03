import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AutService } from '../aut/aut.service';
import { Produto } from '../models/produto.model';
import { from } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';
import { ProdutosService } from '../main/produtos.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  constructor(private autService: AutService, private router: Router, private produtoService: ProdutosService) { }

  user: User;
  bag: Produto[] = [];
  total: number = 0

  ngOnInit(): void {
    this.getItens();
  }

  calculaTotalDaCompra(carrinho: Produto[]) {
    this.total = 0
    for (let i in carrinho) {
      if (carrinho[i].estoque > 0) {
        this.total += carrinho[i].preco;
      }
    }

  }

  getItens() {
    this.autService.getUser()
      .subscribe(user => {
        this.bag = user.carrinho;
        this.calculaTotalDaCompra(user.carrinho);
        this.user = user;
      });
  }

  removeItem(i: number) {
    this.user.carrinho.splice(i, 1);

    this.autService.removeItemBag(this.user);
  }

  finalizarCompra() {

    for (let i in this.bag) {
      this.produtoService.removeItemEstoque(this.bag[i]);
    }
    this.user.carrinho = [];

    this.autService.removeItemBag(this.user);

    alert('Compra realiza com sucesso!');
    this.router.navigateByUrl('/');
  }

}
