import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{

  qId='';
  qTitle='';
  questions = [
    {
      questionId:'',
      answer:'',
      content:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      image:''
    }
  ];

  constructor(private _route:ActivatedRoute,private _question:QuestionService) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['id'];
    this.qTitle = this._route.snapshot.params['title'];
    this._question.getQuestionOfQuiz(this.qId).subscribe(
      (data:any) =>{
        console.log(data);
        this.questions = data;
      },
      (error) =>{
        console.log(error);
      }
    )
  }

  deleteQuestion(questionId:any){
    Swal.fire({
      icon:'info',
      title:'Are you sure delete this question ?',
      confirmButtonText:'Delete',
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        this._question.deleteQuestion(questionId).subscribe(
          (data) => {
            this.questions = this.questions.filter((question) => question.questionId != questionId); // کوییزهایی که ادیشون توی با مقدار ارایه شده برابر نیست را فیلتر میکند
            Swal.fire('Success','Question Deleted Successfully','success');      // در واقع اونی که حذف شده ایدیش برابر با ایدی ارایه شده اس پس نمایشش نمیده
          },
          (error) =>{
            Swal.fire('Error','Question could not be deleted','error');
          }
        );
      }
    })
  }

}
