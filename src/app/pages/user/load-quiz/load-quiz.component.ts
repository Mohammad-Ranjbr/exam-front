import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

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
  catId=null;

  constructor(private _route:ActivatedRoute,private _quiz:QuizService) {}

  ngOnInit(): void {
    this._route.params.subscribe(
      (params) => {
        this.catId = params['catId'];
        if(this.catId == 0){
          console.log('Load all the quiz');
          this._quiz.getActiveQuizzes().subscribe(
            (data:any) => {
              this.quizzes = data;
              console.log(this.quizzes);
            },
            (error) => {
              console.log(error);
              alert('error in loading all quizzes');
            }
          );
        } else {
          console.log('Load specific quiz');
          this._quiz.getActiveQuizzesOfCaategory(this.catId).subscribe(
            (data:any) => {
              this.quizzes = data;
            },(error) => {
              alert('error in load data');
            }
          );
        }
      }
    );
    

  }

}
