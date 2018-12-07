import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppComponent } from './app.component';
const routes: Routes = [];

@NgModule({ 
  imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }
