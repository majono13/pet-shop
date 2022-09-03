import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AutService } from '../aut.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  FormUser = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
    senha1: ['', [Validators.minLength(6), Validators.required]],
    senha2: ['', [Validators.minLength(6), Validators.required]],
  }, { validator: this.matchSenha })

  alertaSucesso: any = null;
  unsubscribe$: Subject<any> = new Subject();

  constructor(private fb: FormBuilder, private autService: AutService, private router: Router) { }

  ngOnInit(): void {
  }

  matchSenha(group: FormGroup) {
    if (group) {
      const senha1 = group.controls['senha1'].value;
      const senha2 = group.controls['senha2'].value;

      if (senha1 === senha2) return null
    }
    return { matching: false };
  }

  onSubmit() {
    const novoUsuario: User = {
      nome: this.FormUser.value.nome,
      email: this.FormUser.value.email,
      carrinho: [],
      senha: this.FormUser.value.senha1,
    }

    this.autService.registro(novoUsuario)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        error: (err) => {
          this.alertaSucesso = false;
          setTimeout(() => this.alertaSucesso = '', 3000);
        },
        next: (user) => {
          this.alertaSucesso = true;
          setTimeout(() => this.alertaSucesso = '', 3000);
          this.router.navigateByUrl('/');
        }
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }

}
