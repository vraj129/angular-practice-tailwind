import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from '../model/res_user_model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  userModel: UserModel = [];
  isLoading: boolean = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getAllUser().subscribe(
      (val) => {
        this.userModel = val;
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  transform(value: string): boolean {
    return value.includes('gmail');
  }
}
