import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {
  users: User[]=[];

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees(){
    this.userService.getEmployeesList().subscribe(data => {
      this.users = data;
    });
  }
  delete(id:number){
    this.userService.deleteUser(id).subscribe(data => {
      console.log(data);
      this.getEmployees();
    })
  }
  navigateToUpdate(id:number){
    this.router.navigate(['update',id]);
  }

}
