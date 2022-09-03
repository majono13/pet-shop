import { Injectable } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class FindProdutoService {
  constructor() { }

  produtoSFiltrados: Produto[] = []

  findProduto(produtos: Produto[], categoria: string): Produto[] {
    this.produtoSFiltrados = []
    for (let i in produtos) {
      if (produtos[i].categoria === categoria) {

        this.produtoSFiltrados.push(produtos[i])
      }
    }

    return this.produtoSFiltrados;

  }

}
