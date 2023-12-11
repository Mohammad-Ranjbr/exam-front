import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{
  public Editor = ClassicEditor;
  qId='';
  qTitle='';
  question =
    {
      answer:'',
      content:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      image:'',
      quiz:{
        quizId:''
      }
    }

  constructor(private _route:ActivatedRoute,private _question:QuestionService,private _snack:MatSnackBar) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['qtitle'];
    this.question.quiz.quizId = this.qId;
  }

  formSubmit(){
    if(this.question.content.trim() == '' || this.question.content.trim() == null){
      this._snack.open("Content is required !",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'center'
      });
      return;
    }
    if(this.question.option1.trim() == '' || this.question.option1.trim() == null){
      this._snack.open("Option1 is required !",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'center'
      });
      return;
    }
    if(this.question.option2.trim() == '' || this.question.option2.trim() == null){
      this._snack.open("option2 is required !",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'center'
      });
      return;
    }
    if(this.question.option3.trim() == '' || this.question.option3.trim() == null){
      this._snack.open("Option3 is required !",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'center'
      });
      return;
    }
    if(this.question.option4.trim() == '' || this.question.option4.trim() == null){
      this._snack.open("Option4 is required !",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'center'
      });
      return;
    }
    if(this.question.answer.trim() == '' || this.question.answer.trim() == null){
      this._snack.open("Answer is required !",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'center'
      });
      return;
    }

    this._question.addQuestion(this.question).subscribe(
      (data) => {
        Swal.fire('Success','Question Successfully Added','success');
        this.question =
        {
          answer:'',
          content:'',
          option1:'',
          option2:'',
          option3:'',
          option4:'',
          image:'',
          quiz:{
            quizId:this.qId
          }
        }
      },
      (error) => {
        Swal.fire('Error','Question could not be saved','error')
      }
    );

  }

}
