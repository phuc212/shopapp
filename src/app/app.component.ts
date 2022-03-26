import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageServiceService } from './service/token-storage-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, DoCheck {
  title = 'shopmanagerapp';
  isLogged: boolean = false;

  constructor(private tokenStorage: TokenStorageServiceService) {}

  ngOnInit() {}

  ngDoCheck() {
    if (this.tokenStorage.getToken() && this.tokenStorage.isAuthenticated()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
}
