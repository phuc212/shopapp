import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User, UserPagination } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  subjectKeyup = new Subject<any>();
  users?: User[];
  userDelete?: User;
  keySearch?: string = '';
  orderNameDesc?: boolean = false;
  orderNameAsc?: boolean = false;
  listPageSize = [
    { label: '9', value: 9 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
    { label: '25', value: 25 },
  ];

  pageSize = this.listPageSize[0];
  currentPage = 1;
  ordinalNumber = this.currentPage * this.pageSize.value;
  totalUsers = 0;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsers(this.currentPage - 1, this.pageSize.value);
    this.subjectKeyup.pipe(debounceTime(1000)).subscribe((d) => {
      this.findAllByNameContaining(
        d,
        this.currentPage - 1,
        this.pageSize.value
      );
    });
  }

  public getUsers(currentPage: number, pageSize: number): void {
    this.userService
      .getAllUser(currentPage, pageSize)
      .subscribe((response: UserPagination) => {
        this.users = response.content;
        this.totalUsers = response.totalElements;
        (error: HttpErrorResponse) => {
          alert(error.message);
        };
      });
  }

  changePageSize(value: any) {
    this.pageSize = value;
    this.currentPage = 1;
    if (this.keySearch?.trim() === '') {
      if (this.orderNameAsc && !this.orderNameDesc) {
        this.findByDeletedIsFalseOrderByNameAsc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else if (this.orderNameDesc && !this.orderNameAsc) {
        this.findByDeletedIsFalseOrderByNameDesc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else {
        this.getUsers(this.currentPage - 1, this.pageSize.value);
      }
    } else {
      if (this.orderNameAsc && !this.orderNameDesc) {
        this.findByDeletedIsFalseOrderByNameAsc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else if (this.orderNameDesc && !this.orderNameAsc) {
        this.findByDeletedIsFalseOrderByNameDesc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else {
        this.findAllByNameContaining(
          this.keySearch,
          this.currentPage - 1,
          this.pageSize.value
        );
      }
    }
  }
  changePage() {
    this.ordinalNumber = (this.currentPage - 1) * this.pageSize.value;
    if (this.keySearch?.trim() === '') {
      if (this.orderNameAsc && !this.orderNameDesc) {
        this.findByDeletedIsFalseOrderByNameAsc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else if (this.orderNameDesc && !this.orderNameAsc) {
        this.findByDeletedIsFalseOrderByNameDesc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else {
        this.getUsers(this.currentPage - 1, this.pageSize.value);
      }
    } else {
      if (this.orderNameAsc && !this.orderNameDesc) {
        this.findByDeletedIsFalseOrderByNameAsc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else if (this.orderNameDesc && !this.orderNameAsc) {
        this.findByDeletedIsFalseOrderByNameDesc(
          this.currentPage - 1,
          this.pageSize.value
        );
      } else {
        this.findAllByNameContaining(
          this.keySearch,
          this.currentPage - 1,
          this.pageSize.value
        );
      }
    }
  }

  public openModalLoad(user: User) {
    this.userService.getUserById(user.id).subscribe(
      (response: User) => {
        let link = '/user-manager/edit/' + response.id;
        this.router.navigate([link]);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.userDelete = user;
          const container = document.getElementById('main-container');
          const button = document.createElement('button');
          button.type = 'button';
          button.style.display = 'none';
          button.setAttribute('data-toggle', 'modal');
          button.setAttribute('data-target', '#loadPage');
          container?.appendChild(button);
          button.click();
        }
      }
    );
  }

  public onOpenModalDetail(user: User) {
    this.userService.getUserById(user.id).subscribe(
      (response: User) => {
        let link = '/user-manager/detail/' + user.id;
        this.router.navigate([link]);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.userDelete = user;
          const container = document.getElementById('main-container');
          const button = document.createElement('button');
          button.type = 'button';
          button.style.display = 'none';
          button.setAttribute('data-toggle', 'modal');
          button.setAttribute('data-target', '#loadPage');
          container?.appendChild(button);
          button.click();
        }
      }
    );
  }

  public onOpenModal(user: User): void {
    this.userService.getUserById(user.id).subscribe(
      (response: User) => {
        this.userDelete = response;
        const container = document.getElementById('main-container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#deleteSupplierModal');
        container?.appendChild(button);
        button.click();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.userDelete = user;
          const container = document.getElementById('main-container');
          const button = document.createElement('button');
          button.type = 'button';
          button.style.display = 'none';
          button.setAttribute('data-toggle', 'modal');
          button.setAttribute('data-target', '#loadPage');
          container?.appendChild(button);
          button.click();
        }
      }
    );
  }

  public deleteUser(userId: number | undefined) {
    this.userService.deleteUser(userId).subscribe(
      (response: void) => {
        this.getUsers(this.currentPage - 1, this.pageSize.value);
        this.showToastrError();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onSearch($event: any) {
    const value = $event.target.value;
    if (value === '') {
      this.getUsers(this.currentPage - 1, this.pageSize.value);
    } else {
      this.subjectKeyup.next(value);
    }
  }

  public findAllByNameContaining(
    search: string | undefined,
    currentPage: number,
    pageSize: number
  ) {
    this.orderNameDesc = false;
    this.orderNameAsc = false;
    this.userService
      .findByNameContaining(search, currentPage, pageSize)
      .subscribe(
        (response: UserPagination) => {
          this.users = response.content;
          this.totalUsers = response.totalElements;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public findByDeletedIsFalseOrderByNameDesc(
    currentPage: number,
    pageSize: number
  ) {
    this.orderNameDesc = true;
    this.orderNameAsc = false;
    this.userService.orderByFullNameDesc(currentPage, pageSize).subscribe(
      (response: UserPagination) => {
        console.log(response);
        this.users = response.content;
        this.totalUsers = response.totalElements;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public findByDeletedIsFalseOrderByNameAsc(
    currentPage: number,
    pageSize: number
  ) {
    this.orderNameAsc = true;
    this.orderNameDesc = false;
    this.userService.orderByFullNameAsc(currentPage, pageSize).subscribe(
      (response: UserPagination) => {
        this.users = response.content;
        this.totalUsers = response.totalElements;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  showToastrError() {
    this.toastr.error(this.userDelete?.fullName + ' đã bị xóa', 'error', {
      timeOut: 2000,
      progressBar: true,
    });
  }
}
