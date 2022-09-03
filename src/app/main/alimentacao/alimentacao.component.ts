import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Produto } from 'src/app/models/produto.model';
import { CarrinhoService } from 'src/app/shared/services/carrinho.service';
import { FindProdutoService } from 'src/app/shared/services/findProdutos.service';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-alimentacao',
  templateUrl: './alimentacao.component.html',
  styleUrls: ['./alimentacao.component.css']
})
export class AlimentacaoComponent implements OnInit {

  private unsubscribe$: Subject<any> = new Subject();

  alimentos: Produto[];

  constructor(private produtosService: ProdutosService, private find: FindProdutoService, private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.getProdutos();
    this.carrinhoService.verificaLogin();
  }

  getProdutos() {
    this.produtosService.getProdutos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((prod) => {
        this.alimentos = this.find.findProduto(prod, 'Alimentação');
      });
  }

  addItemAoCarrinho(p: Produto) {
    this.carrinhoService.addItemAoCarrinho(p);
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }

}
