import { CooperationComponent } from './pages/cooperation/cooperation.component';
import { MyPayBackComponent } from './pages/mypayback/mypayback.component';
import { PayBackComponent } from './pages/payback/payback.component';
import { GameLogComponent } from './pages/gamelog/gamelog.component';
import { FeedBackComponent } from './pages/feedback/feedback.component';
import { IntroDetailComponent } from './pages/introdetail/introdetail.component';
import { IntroComponent } from './pages/intro/intro.component';
import { TrendDetailComponent } from './pages/trendDetail/trendDetail.component';
import { TrendCommon } from './components/trendcommon/trendCommon.component';
import { UserCenterComponent } from './pages/userCenter/userCenter.component';
import { HistoryCommon } from './components/historycommon/historycommon.component';
import { TrendComponent } from './pages/trend/trend.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { HistoryComponent } from './pages/history/history.component';
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
    PurchaseComponent,
    HistoryComponent,
    TrendComponent,
    UserCenterComponent,
    HistoryCommon,
    TrendCommon,
    TrendDetailComponent,
    IntroComponent,
    IntroDetailComponent,
    FeedBackComponent,
    GameLogComponent,
    PayBackComponent,
    MyPayBackComponent,
    CooperationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(AppComponent,{
      iconMode: 'md',
      tabsHideOnSubPages: true
    })
  ],
  providers: [],
  entryComponents: [
    IndexComponent,
    PurchaseComponent,
    HistoryComponent,
    UserCenterComponent,
    TrendComponent,
    TrendCommon,
    TrendDetailComponent,
    IntroComponent,
    IntroDetailComponent,
    FeedBackComponent,
    GameLogComponent,
    PayBackComponent,
    MyPayBackComponent,
    CooperationComponent
  ],
  bootstrap: [IonicApp]
})
export class AppModule { }
