import { Component,Input,OnInit,OnChanges,SimpleChanges} from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Note } from '../../interfaces/note';
import { NoteService } from '../../services/note.service';
import { error } from 'console';


@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.scss'
})
export class NoteFormComponent implements OnInit, OnChanges{

  noteForm!:FormGroup;
  @Input() selectedNote!:Note; ///recieve the value sent from child component to parent, then from parent to this child component
  isEdit!: boolean;

  constructor(private noteService:NoteService, private formBuilder: FormBuilder){
    this.noteService.getEditable().subscribe({
      next: (response) => (this.isEdit = response),///take the value from getEditable function and saving it in the isEdit value here
    });
  }

  ngOnChanges(changes: SimpleChanges): void { ///detect the values of input variables coming from parent component without reinitializing from of that component
    if(changes['selectedNote']?.currentValue){
      const value = changes['selectedNote']?.currentValue;
      this.noteForm.patchValue({
        id: value.id,
        title: value.title,
        content: value.content
      })
    }
  }

  ngOnInit(): void {
     this.noteForm = this.formBuilder.group({
      id: new Date().getTime(),
      title:['',Validators.required],
      content:[''],
     })
  }

  onSubmit():void{
    if(this.noteForm.invalid){
      return;
    }
    const note: Note= this.noteForm.value;
    if(this.isEdit){
      this.noteService.updateNote(note);
      this.noteService.setEditable(false);
    }
    else{
      this.noteService.createNote(note);
    }
    this.noteForm.reset();
  }
}
