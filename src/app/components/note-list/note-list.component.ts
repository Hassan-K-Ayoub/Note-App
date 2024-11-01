import { Component,OnInit,EventEmitter,Output } from '@angular/core';
import { Note } from '../../interfaces/note';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent implements OnInit{
  notes: Note[] = [];
  @Output() selectedNote = new EventEmitter<Note>();///pass value of the selected note to parent that will pass it agian to the child note form componenet

  constructor(private noteService: NoteService){}

  ngOnInit(): void {
    this.noteService.getNotesObservable().subscribe((notes: Note[])=>{
      this.notes = notes;
    })
  }

  editNote(note: Note):void{
    this.selectedNote.emit(note);///passs the note that needs to be edited
    this.noteService.setEditable(true);///return the boolean that tells the form that it should edit and not add . this function is from the service
  }

  deleteNote(id: number):void{
    this.noteService.deleteNote(id);
  }
}
