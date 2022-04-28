import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './header/header.module';
import { HomeComponent } from './home/home.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { ListsComponent } from './lists/lists.component';
import { TestErrorsComponent } from './_errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/Error.interceptor';
import { NotFoundComponent } from './error-page/not-found/not-found.component';
import { ServerErrorComponent } from './error-page/server-error/server-error.component';
import { MembersModule } from './members/members.module';
import { TokenInterceptor } from './_interceptors/token.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { SharedModule } from './_modules/shared/shared.module';
import { MessagesModule } from './messages/messages.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListsComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HeaderModule,
    AuthenticationModule,
    MessagesModule,
    MembersModule,
    NgxSpinnerModule,
    SharedModule,
  ],
  exports: [

  ],
  providers: [
    // we use multi for not replace default angular interceptor
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
