import { Produto } from "./produto.model";

export class User {
  nome: string;
  email: string;
  senha?: string;
  id?: string;
  carrinho: Produto[] = [];

}
