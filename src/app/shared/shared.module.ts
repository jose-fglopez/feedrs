import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { FilterPipe } from './pipes/filter.pipe';



@NgModule({
  declarations: [
    SafeHtmlPipe,
    FilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SafeHtmlPipe,
    FilterPipe
  ],
  providers: []
})
export class SharedModule { }

/*
DO declare components, pipes, directives, etc, and export them
DO import FormsModule, ReactiveFormsModule and other modules needed in the nested components
DO import the SharedModule into any other Feature module under the 'modules' folder
DO NOT provide singleton services. These ones must be on CoreModule under the 'core' folder
DO NOT import the SharedModule into the AppModule
*/