import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces/user';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  public user!: IUser;
  constructor(
    private readonly userService: UserService,
    private readonly storageService: StorageService,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (res) => {
        this.user = res.data.data;
      },
      error: (error) => console.log(error),
    });
  }

  public logout(): void {
    this.storageService.removeItem('auth_token');
    this.router.navigate(['/auth'])
  }
}
