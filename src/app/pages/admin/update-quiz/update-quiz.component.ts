import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{

  qId=0;

  quiz={
    quizId:'',
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:false,
    category:{
      id:'',
      title:''
    }
  }

  categories=[
    {
      id:23,
      title:'Programming'
    }
  ]

  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _category:CategoryService,private router:Router) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz = data;
        console.log(this.quiz);
      },
      (error)=>{
        console.log(error);
      }
    );

    this._category.getCategory().subscribe(
      (data:any) =>{
        this.categories = data;
        console.log(data);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error','Error in loading categories from server','error');
      }
    )
  }

  updateSubmit(){
    this._quiz.updateQuiz(this.quiz.quizId,this.quiz).subscribe(
      (data) =>{
        Swal.fire('Success','Quiz Updated Successfully','success').then((e)=>{
          this.router.navigate(['/admin-dashboard/quizzes']);
        });
      },
      (error) =>{
        Swal.fire('Error','Quiz could not be updated','error');
        console.log(error);
      }
    )
  }

}
