import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private userService:UserService,private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}
  
  public user={
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:''
  };

  formSubmit(){
    
    console.log(this.user);
    if(this.user.username.trim() == '' || this.user.username.trim() == null){
      this._snackBar.open("Username is required !",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'center'
      });
      return;
    }
    if(this.user.password.trim() == '' || this.user.password.trim() == null){
      this._snackBar.open("Password is required !",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'center'
      });
      return;
    }
    if(this.user.firstname.trim() == '' || this.user.firstname.trim() == null){
      this._snackBar.open("First Name is required !",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'center'
      });
      return;
    }
    if(this.user.lastname.trim() == '' || this.user.lastname.trim() == null){
      this._snackBar.open("Last Name is required !",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'center'
      });
      return;
    }
    if(this.user.email.trim() == '' || this.user.email.trim() == null){
      this._snackBar.open("Email is required !",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'center'
      });
      return;
    }
    if(this.user.phone.trim() == '' || this.user.phone.trim() == null){
      this._snackBar.open("Phone Number is required !",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'center'
      });
      return;
    }

    // addUser
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire('Success','User successfully registered','success');
      },
      (error)=>{
        console.log(error);
        this._snackBar.open("Something went wrong !",'',{
          duration:5000,
          verticalPosition:'top',
          horizontalPosition:'center'
        });
      }
    );

  }

}
