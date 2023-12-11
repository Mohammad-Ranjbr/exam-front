import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes=[
    {
      quizId:23,
      title:'Basic Java Quiz',
      description:'Java is a platform-independent and robust programming language. The principle followed by Java is WORA that says Write Once, Run Anywhere',
      maxMarks:'50',
      numberOfQuestions:'20',
      active:'',
      category:{
        title:'Programming'
      }
    }
  ]

  constructor(private _quiz:QuizService){}

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any) =>{
        this.quizzes = data;
        console.log(data);
      },
      (error) =>{
        console.log(error);
        Swal.fire('Error','Error in loading data','error');
      }
    )
  }

  deleteQuiz(id:any){
    Swal.fire({
      icon:'info',
      title:'Are you sure delete this quiz ?',
      confirmButtonText:'Delete',
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        this._quiz.deleteQuiz(id).subscribe(
          (data) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.quizId != id); // کوییزهایی که ادیشون توی با مقدار ارایه شده برابر نیست را فیلتر میکند
            Swal.fire('Success','Quiz Deleted Successfully','success');      // در واقع اونی که حذف شده ایدیش برابر با ایدی ارایه شده اس پس نمایشش نمیده
          },
          (error) =>{
            Swal.fire('Error','Quiz could not be deleted','error');
          }
        );
      }
    })
    
  }

}
