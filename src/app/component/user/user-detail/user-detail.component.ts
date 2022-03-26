import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  id?: number;
  formDetailUser!: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.createFormDetailUser(this.id);
  }

  createFormDetailUser(userId: number | undefined) {
    this.formDetailUser = this.formBuilder.group({
      id: [0],
      fullName: [''],
      gender: [''],
      dayOfBirth: [],
      address: [''],
      phoneNumber: [''],
      email: [''],
      role: this.formBuilder.group({
        id: [],
        name: [''],
      }),
    });
    this.userService.getUserById(userId).subscribe((response: User) => {
      this.formDetailUser?.patchValue(response);
    });
  }

  get roleName() {
    return this.formDetailUser.get('role')?.get('name');
  }

  redirectList() {
    this.router.navigate(['user-manager']);
  }
}
