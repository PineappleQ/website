import { TabAComponent } from './pages/tabA/taba.component';
import { TabBComponent } from './pages/tabB/tabB.component';
import { IndexComponent } from './pages/index/index.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicModule, IonicApp } from 'ionic-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    TabAComponent,
    TabBComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(AppComponent)
  ],
  providers: [],
  entryComponents: [
    IndexComponent,
    TabAComponent,
    TabBComponent
  ],
  bootstrap: [IonicApp]
})
export class AppModule { }
