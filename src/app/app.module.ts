import { ShareComponent } from './pages/share/share.component';
import { SafeUrlPipe, FormatTime } from './pipe/pipe';
import { ChatItem } from './components/chatitem/chatitem.component';
import { RoomComponent } from './pages/room/room.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutUsComponent } from './pages/aboutus/aboutus.component';
import { ContactUsComponent } from './pages/contactus/contactus.component';
import { SystemActivityComponent } from './pages/systemactivity/systemactivity.component';
import { UserAgreementComponent } from "./pages/userAgreement/useragreement.component";
import { SystemNotifyComponent } from './pages/systemnotify/systemnotify.component';
import { UserService } from './service/userService';
import { PlayService } from './service/playService';
import { ServiceBase } from './service/ServiceBase';
import { ContentManage } from './service/contentmanage';
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
import { HttpModule, JsonpModule } from '@angular/http';
import { IonicModule, IonicApp } from 'ionic-angular';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
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
    CooperationComponent,
    SystemNotifyComponent,
    UserAgreementComponent,
    SystemActivityComponent,
    ContactUsComponent,
    AboutUsComponent,
    LoginComponent,
    RoomComponent,
    ShareComponent,
    ChatItem,
    SafeUrlPipe,
    FormatTime
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(AppComponent, {
      iconMode: 'md',
      tabsHideOnSubPages: true
    }),
    IonicStorageModule.forRoot()
  ],
  providers: [
    ContentManage,
    PlayService,
    UserService,
    ServiceBase
  ],
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
    CooperationComponent,
    SystemNotifyComponent,
    UserAgreementComponent,
    SystemActivityComponent,
    ContactUsComponent,
    AboutUsComponent,
    LoginComponent,
    RoomComponent,
    ShareComponent
  ],
  bootstrap: [IonicApp]
})
export class AppModule { }
