import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Produto } from 'src/app/models/produto.model';
import { CarrinhoService } from 'src/app/shared/services/carrinho.service';
import { FindProdutoService } from 'src/app/shared/services/findProdutos.service';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-diversos',
  templateUrl: './diversos.component.html',
  styleUrls: ['./diversos.component.css']
})
export class DiversosComponent implements OnInit {

  unsubscribe$: Subject<any> = new Subject();
  diversos: Produto[];
  roupinhas: Produto[];

  constructor(private produtosService: ProdutosService, private find: FindProdutoService, private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.getProdutos();
    this.carrinhoService.verificaLogin();
  }

  getProdutos() {
    this.produtosService.getProdutos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((prod) => {

        this.diversos = this.find.findProduto(prod, 'Diversos');
        this.roupinhas = this.find.findProduto(prod, 'Roupas');
      })
  }

  addItemAoCarrinho(p: Produto) {
    this.carrinhoService.addItemAoCarrinho(p);
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }

}
