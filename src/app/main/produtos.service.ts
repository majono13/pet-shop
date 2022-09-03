import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';

import { Produto } from '../models/produto.model';


@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private readonly produtosCollection: AngularFirestoreCollection<Produto> = this.afs.collection('produtos');
  produtosFiltrados: Observable<Produto[]>;

  constructor(private afs: AngularFirestore) { }


  getProdutos(): Observable<Produto[]> {
    return this.produtosCollection.valueChanges();
  }

  async removeItemEstoque(produto: Produto) {
    await this.produtosCollection.doc(produto.id).update({ estoque: produto.estoque - 1 });
  }

}
