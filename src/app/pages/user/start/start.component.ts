import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{

  qid=null;
  questions =[
    {
      answer:'',
      givenAnswer:'',
      content:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      image:'',
      quiz:{
        quizId:'',
        title:'',
        maxMarks:0,
      }
    }
  ]

  result:any = {
    marksGot:0,
    correctAnswers:0,
    attempted:0
  }

  isSubmit=false;

  timer: any;

  constructor(private locationSt:LocationStrategy,private _route:ActivatedRoute,private _question:QuestionService) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    this.loadQuestions();
  }

  preventBackButton(){
    history.pushState(null, '',location.href);
    this.locationSt.onPopState(() =>{
      history.pushState(null, '', location.href);
    });
  }

  loadQuestions(){
    this._question.getQuestionOfQuizForTest(this.qid).subscribe(
      (data:any) => {
        this.questions = data;
        this.timer = this.questions.length * 2 * 60;
        console.log(this.questions);
        this.startTimer();
      },
      (error) => {
        console.log(Error);
        Swal.fire('Error','Error in loading question of quiz','error');
      }
    )
  }

  submitQuiz(){
    Swal.fire({
      title: "Do you want to submit the quiz?",
      showCancelButton: true,
      confirmButtonText: "Submit",
      icon:'info'
    }).then(
      (result) => {
        if(result.isConfirmed){
          this.evalQuiz();
        }
      });
  }

  startTimer(){
   let t =  window.setInterval(() => {
      if(this.timer <= 0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  getFormattedTimer(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer-mm*60;
    return`${mm} min : ${ss} sec`
  }

  evalQuiz(){
    this._question.evaluatingQuiz(this.questions).subscribe(
      (data:any) => {
        this.result = data;
        this.result.marksGot = Number(this.result.marksGot).toFixed(2);
        this.isSubmit = true;
      },
      (error) => {
        console.log(error);
      }
    );
    // this.isSubmit = true;
    // this.questions.forEach(q => {
    // if(q.givenAnswer == q.answer){
    //     this.correctAnswers++;
    //     let marksSingle = this.questions[0].quiz.maxMarks/this.questions.length;
    //     this.marksGot += marksSingle;
    // }
    // if(q.givenAnswer != '' && q.givenAnswer != null){
    //   this.attempted++;
    // }
    // })
  }

  printPage(){
    window.print();
  }

}


