import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoteService } from './services/note.service';

@NgModule({
  declarations: [
    AppComponent,
    NoteFormComponent,
    NoteListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),NoteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
