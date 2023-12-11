import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit{

  categories = [
    {
      id:23,
      title:'Programming',
      description:'this is a test'
    },
  ];
  
  constructor(private _category:CategoryService,private _snack:MatSnackBar) {}
  
  ngOnInit(): void {
    this._category.getCategory().subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories);
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error','Error in loading data','error');
    });
  }

}
