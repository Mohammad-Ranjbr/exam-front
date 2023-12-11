import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginData={
    username:'',
    password:''
  }

  constructor(private _snackBar: MatSnackBar,private loginService:LoginService,private router:Router) {}

  ngOnInit(): void {
      
  }

  formSubmit(){

    console.log(this.loginData);
    if(this.loginData.username.trim() == '' || this.loginData.username.trim() == null){
      this._snackBar.open("Username is required !",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'center'
      });
      return;
    }
    if(this.loginData.password.trim() == '' || this.loginData.password.trim() == null){
      this._snackBar.open("Password is required !",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'center'
      });
    }

    // Request to server to generate token

    this.loginService.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("success");
        console.log(data);

        // login 
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe(
          (user:any)=>{
            this.loginService.setUser(user);
            console.log(user);
            if(this.loginService.getUserRole() == "ADMIN"){
              // redirect if user == ADMIN -> admin dashboard
              this.router.navigate(['/admin-dashboard']);
              this.loginService.loginStatusSubject.next(true);
            } else if(this.loginService.getUserRole() == "USER") {
              // redirect if user == NORMAL -> user dashboard
              this.router.navigate(['/user-dashboard/0']);
              this.loginService.loginStatusSubject.next(true);
            } else {
              this.loginService.logout();
              //location.reload();
            }
            
          }
        );
        
      },
      (error)=>{
        console.log("error");
        console.log(error);
        this._snackBar.open("Invalid Username or Password",'',{
          duration:5000,
          verticalPosition:'top',
          horizontalPosition:'center'
        })
      }
    );   

  }

}
