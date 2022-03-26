import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageServiceService } from 'src/app/service/token-storage-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isLogged: boolean = false;
  userName: string | null = '';

  constructor(
    private tokenStorage: TokenStorageServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngDoCheck() {
    if (this.tokenStorage.getToken()) {
      this.isLogged = true;
      this.userName = this.tokenStorage.getUserName();
    } else {
      this.isLogged = false;
    }
  }

  logOut() {
    this.tokenStorage.logOut();
    this.isLogged = false;
    this.router.navigate(['']);
  }
}
