import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListaComponent } from './lista/lista.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

const rutas: Routes = [
  { path: '', component: AppComponent },
  { path: 'listado', component: ListaComponent },
  { path: 'login',component:LoginComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListaComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
