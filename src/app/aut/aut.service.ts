import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


import { catchError, from, map, Observable, of, switchMap, throwError } from 'rxjs';
import { Produto } from '../models/produto.model';

import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AutService {

  private readonly userCollection: AngularFirestoreCollection<User> = this.afs.collection('clientes');

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) { }

  registro(user: User): Observable<boolean> {
    return from(this.afAuth.createUserWithEmailAndPassword(user.email, user.senha))
      .pipe(
        switchMap((u) =>
          this.userCollection.doc(u.user.uid).set({
            nome: user.nome,
            email: user.email,
            id: u.user.uid,
            carrinho: [],
          })
            .then(() => true)
        )
      )
  }

  autenticado(): Observable<boolean> {
    return this.afAuth.authState
      .pipe(
        map(u => (u) ? true : false)
      )
  }

  getUser(): Observable<User> {
    return this.afAuth.authState
      .pipe(
        switchMap((u) => (u) ? this.userCollection.doc<User>(u.uid).valueChanges() : of(null))
      );
  }


  login(email: string, senha: string): Observable<User> {
    return from(this.afAuth.signInWithEmailAndPassword(email, senha))
      .pipe(
        switchMap((u) => this.userCollection.doc<User>(u.user.uid).valueChanges()),
        catchError((err) => throwError(() => err))
      );
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigateByUrl('/');
  }

  async addItemBag(carrinho: Produto[], id: string) {
    this.userCollection.doc(id).update({ carrinho: carrinho })
  }

  removeItemBag(user: User) {
    this.userCollection.doc(user.id).update({ carrinho: user.carrinho })
  }
}
