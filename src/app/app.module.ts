import { PageCommonComponent } from './components/pagecommon/pagecommon.component';
import { CanadaComponent } from './pages/Canada/Canada.component';
import { LuckyComponent } from './pages/lucky/lucky.component';
import { DenmarkComponent } from './pages/Denmark/Denmark.component';
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
    LuckyComponent,
    DenmarkComponent,
    CanadaComponent,
    PageCommonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(AppComponent,{
      iconMode: 'md',
      tabsPlacement: 'top'
    })
  ],
  providers: [],
  entryComponents: [
    IndexComponent,
    LuckyComponent,
    DenmarkComponent,
    CanadaComponent
  ],
  bootstrap: [IonicApp]
})
export class AppModule { }
