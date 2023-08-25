import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  forminstance!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private route: Router
  ) {
    this.formCall();
  }
  ngOnInit(): void {}

  formCall() {
    this.forminstance = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  submitForm() {
    if (this.forminstance.valid) {
      const email = this.forminstance.value.email;
      const password = this.forminstance.value.password;
      this.userservice.loginRoute(email, password).subscribe((data) => {
        if (data.length > 0) {
          alert('Login Succesfull');
          this.forminstance.reset();
          this.route.navigate(['/menu-page']);
        } else {
          alert('Some Error Occoured');
        }
      });
    }
  }
}
