import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{

  categories=[
    {
      id:23,
      title:'Programming'
    }
  ]

  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:false,
    category:{
      id:''
    }
  }

  constructor(private _category:CategoryService,private _snack:MatSnackBar,private _quiz:QuizService) {}

  ngOnInit(): void {
    this._category.getCategory().subscribe(
      (data:any) => {
        this.categories = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error','Error in loading categories from server','error');
      }
    )
  }

  formSubmit(){
    if(this.quizData.title.trim() == '' || this.quizData.title.trim() == null){
      this._snack.open("Title is required !",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'center'
      });
      return;
    }

    this._quiz.addQuiz(this.quizData).subscribe(
      (data) =>{
        Swal.fire('Success','Quiz Added Successfully','success');
        this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:false,
          category:{
            id:''
          }
        }
      },
      (error) => {
        console.log(error);
        Swal.fire('Error','Quiz could not be saved','error');
      }
    )

  }

}
