import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ConfigurableForbiddenNameValidatorDirective } from './validation/like-validation.directive';

import { HeroDisplayComponent } from './hero-display/hero-display.component';
import { HeroFormContainerComponent } from './hero-form/hero-form-container.component';
import { HeroFormComponent } from './hero-form/hero-form.component';

import { HeroEditNamesComponent } from './hero-edit/hero-edit-names.component';
import { HeroEditPowerComponent } from './hero-edit/hero-edit-power.component';
import { HeroEditQualifierComponent } from './hero-edit/hero-edit-qualifier.component';

import { LikesEditComponent } from './likes-edit/likes-edit.component';
import { LikesFormComponent } from './likes-edit/likes-form.component';
import { LikesGroupFormComponent } from './likes-edit/likes-group-form.component';

import { LikeNestedFormComponent } from './likes-edit/likes-nested/like-nested.component';
import { LikesNestedFormComponent } from './likes-edit/likes-nested/likes-nested.component';

import { QualifiersPipe } from './qualifiers.pipe';

import { ValidationErrorComponent } from './validation/validation-error.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    ConfigurableForbiddenNameValidatorDirective,

    HeroDisplayComponent,

    HeroFormContainerComponent,
    HeroFormComponent,

    HeroEditNamesComponent,
    HeroEditPowerComponent,
    HeroEditQualifierComponent,

    LikesEditComponent,
    LikesFormComponent,
    LikesGroupFormComponent,
    LikeNestedFormComponent,
    LikesNestedFormComponent,

    QualifiersPipe,

    ValidationErrorComponent,
  ],
  bootstrap: [ AppComponent ]
}) 
export class AppModule { }
