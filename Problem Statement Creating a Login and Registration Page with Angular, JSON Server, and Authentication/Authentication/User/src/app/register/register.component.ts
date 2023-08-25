import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/user.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formControler!: FormGroup;
  ngOnInit(): void {}
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: Router
  ) {
    this.formcall();
  }
  registerRoute() {}

  formcall() {
    this.formControler = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  OnSubmit() {
    if (this.formControler.valid) {
      const data: User = this.formControler.value;
      this.userService.registerRoute(data).subscribe(() => {
        this.formControler.reset();
        alert('Registration Succesfull');
        setTimeout(() => {
          this.route.navigate(['/login']);
        }, 1500);
      });
    }
  }
}
