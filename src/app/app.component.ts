import { Component } from '@angular/core';
import { Note } from './interfaces/note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  selectedNote!: Note;///recieved the data from the child component into the parent component

  selectNote(note: Note){
    this.selectedNote = note;
  }
}
