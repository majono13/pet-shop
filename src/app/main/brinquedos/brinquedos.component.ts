import { Component, OnInit } from '@angular/core';
import { from, Subject, takeUntil } from 'rxjs';
import { Produto } from 'src/app/models/produto.model';
import { CarrinhoService } from 'src/app/shared/services/carrinho.service';
import { FindProdutoService } from 'src/app/shared/services/findProdutos.service';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-brinquedos',
  templateUrl: './brinquedos.component.html',
  styleUrls: ['./brinquedos.component.css']
})
export class BrinquedosComponent implements OnInit {

  private unsubscribe$: Subject<any> = new Subject();

  brinquedos: Produto[];


  constructor(private produtosService: ProdutosService, private find: FindProdutoService, private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.getProdutos();
    this.carrinhoService.verificaLogin();
  }



  getProdutos() {
    this.produtosService.getProdutos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((prod) => {
        this.brinquedos = this.find.findProduto(prod, 'Brinquedos');
      })
  }

  addItemAoCarrinho(p: Produto) {
    this.carrinhoService.addItemAoCarrinho(p);
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }

}
