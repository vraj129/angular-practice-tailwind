import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent {
  @Input()
  toggleState: boolean = false;
  @Input()
  userId!: string;
  @Output() userChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private userService: UserService) {}

  onToggleChange(newValue: boolean) {
    this.userChange.emit({
      userId: this.userId,
      status: this.toggleState ? 'active' : 'inactive',
    });
    this.userService.updateUserStatus(newValue, this.userId).subscribe(
      (val) => {},
      (err) => {
        console.log(err);
      }
    );
  }
}
