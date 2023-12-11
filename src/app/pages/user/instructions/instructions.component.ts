import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  
  qid = '';
  quiz:any= {
      quizId:23,
      title:'',
      description:'',
      maxMarks:'',
      numberOfQuestions:'',
      active:'',
      category:{
        title:''
      }
    }

  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _router:Router) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    
    this._quiz.getQuiz(this.qid).subscribe(
      (data:any) => {
        console.log(data);
        this.quiz = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error','Quiz could not be loaded','error');
      }
    );
  }

  startQuiz(){
    Swal.fire({
      title: "Do you want to start the quiz?",
      showCancelButton: true,
      confirmButtonText: "Start",
      denyButtonText: `Don't save`,
      icon:'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        this._router.navigate(['/start/'+this.qid]);
        
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

}
