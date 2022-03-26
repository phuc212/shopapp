import { Component, DoCheck, OnInit } from '@angular/core';
import { TokenStorageServiceService } from 'src/app/service/token-storage-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, DoCheck {
  linkClick?: boolean = false;
  linkClickSupplier?: boolean = false;
  linkClickProduct: boolean = false;
  linkClickUser: boolean = false;
  linkClickImportBill: boolean = false;
  linkClickInventory: boolean = false;
  linkClickBill: boolean = false;
  isLogged: boolean = false;
  role: boolean = false;

  constructor(private tokenStorage: TokenStorageServiceService) {}

  ngOnInit() {}

  ngDoCheck() {
    if (this.tokenStorage.getToken()) {
      const roles = JSON.parse(
        sessionStorage.getItem('AuthAuthorities') || '[]'
      );
      roles.forEach((rol: any) => {
        if (rol === 'ROLE_ADMIN') {
          this.role = true;
        } else if (rol === 'ROLE_USER') {
          this.role = false;
        }
        this.isLogged = true;
      });
    } else {
      this.isLogged = false;
    }
  }

  public changeColorPC() {
    this.linkClick = true;
    this.linkClickSupplier = false;
    this.linkClickProduct = false;
    this.linkClickUser = false;
    this.linkClickImportBill = false;
    this.linkClickInventory = false;
    this.linkClickBill = false;
  }

  public changeColorSupplier() {
    this.linkClick = false;
    this.linkClickSupplier = true;
    this.linkClickProduct = false;
    this.linkClickUser = false;
    this.linkClickImportBill = false;
    this.linkClickInventory = false;
    this.linkClickBill = false;
  }

  public changColorProduct() {
    this.linkClickProduct = true;
    this.linkClick = false;
    this.linkClickSupplier = false;
    this.linkClickUser = false;
    this.linkClickImportBill = false;
    this.linkClickInventory = false;
    this.linkClickBill = false;
  }

  public changeColorUser() {
    this.linkClickProduct = false;
    this.linkClick = false;
    this.linkClickSupplier = false;
    this.linkClickUser = true;
    this.linkClickImportBill = false;
    this.linkClickInventory = false;
    this.linkClickBill = false;
  }

  public changeColorImportBill() {
    this.linkClickProduct = false;
    this.linkClick = false;
    this.linkClickSupplier = false;
    this.linkClickUser = false;
    this.linkClickImportBill = true;
    this.linkClickInventory = false;
    this.linkClickBill = false;
  }

  public changeColorInventory() {
    this.linkClickProduct = false;
    this.linkClick = false;
    this.linkClickSupplier = false;
    this.linkClickUser = false;
    this.linkClickImportBill = false;
    this.linkClickInventory = true;
    this.linkClickBill = false;
  }

  public changeColorBill() {
    this.linkClickProduct = false;
    this.linkClick = false;
    this.linkClickSupplier = false;
    this.linkClickUser = false;
    this.linkClickImportBill = false;
    this.linkClickInventory = false;
    this.linkClickBill = true;
  }
}
