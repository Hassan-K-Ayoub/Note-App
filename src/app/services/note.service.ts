import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject, } from 'rxjs';
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] = [];
  private notesSubject = new BehaviorSubject<Note[]>([]);
  private isEdit = new BehaviorSubject<boolean>(false);
  constructor() { }

  getEditable(){
    return this.isEdit.asObservable();
  }

  setEditable(value: boolean){
    this.isEdit.next(value);
  }

  getNotesObservable(): Observable<Note[]>{
    return this.notesSubject.asObservable();
  }

  createNote(note: Note):void{
    note.id = new Date().getTime();
    this.notes.push(note);
    this.notesSubject.next(this.notes);
  }

  updateNote(updatedNote: Note):void{
    const index = this.notes.findIndex((note) => note.id === updatedNote.id);
    if(index !== -1){
      this.notes[index] = updatedNote;
      this.notesSubject.next(this.notes);
    }
  }

  deleteNote(id:number):void{
    this.notes = this.notes.filter(note => note.id !== id); ///update the array
    this.notesSubject.next(this.notes); ///inform the other components that this array is updated so that they should upfdate it as well
  }
}
