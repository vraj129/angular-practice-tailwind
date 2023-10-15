import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReqUserModel } from '../model/req_user_model';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  form: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', Validators.required],
    status: ['active'],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private location: Location
  ) {}

  onSubmit() {
    if (this.form.valid) {
      if (this.form.get('gender')?.value === 'rather not specify') {
        if (this.form.get('status')?.value === 'active') {
          this.form.get('status')?.setValue('inactive');
          this.toastr.error('Account will be inactive');
        }
      }
      const userModel: ReqUserModel = {
        email: this.form.get('email')?.value,
        gender: this.getGenderValue(),
        status: this.form.get('status')?.value,
        name:
          this.form.get('firstName')?.value +
          ' ' +
          this.form.get('lastName')?.value,
      };

      this.userService.addUser(userModel).subscribe(
        (val) => {
          this.toastr.success('User added successfully');
          this.location.back();
        },
        (err) => {
          let message: string = '';
          for (var er of err.error) {
            message += er.field + ' ' + er.message + '\nand ';
          }
          this.toastr.error(message);
        }
      );
    }
  }

  getGenderValue(): string {
    if (this.form.get('gender')?.value === 'rather not specify') {
      return 'other';
    }
    return this.form.get('gender')?.value;
  }
}
