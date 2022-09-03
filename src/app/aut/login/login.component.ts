import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutService } from '../aut.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });

  logado: boolean = false

  constructor(private fb: FormBuilder, private autService: AutService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.autService.login(this.loginForm.value.email, this.loginForm.value.senha)
      .subscribe({
        error: err => alert(`Falha ao tentar logar, verifique seu e-mail e senha e tente novamente`),
        next: (u) => this.router.navigateByUrl('/')
      })
  }
}
