import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { AngularMaterialModule } from './shared/angular-modules/angular-material.module';
import { ConvertUTCPipe } from './shared/pipes/convert-utc.pipe';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrderTableComponent } from './shared/components/order-table/order-table.component';
import { DynamicPopupComponent } from './shared/components/dynamic-popup/dynamic-popup.component';
import { OrderDetailComponent } from './shared/components/order-detail/order-detail.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    SwiperModule,
    RouterModule.forRoot([
      {
        path: 'dashboard', component: DashboardComponent
      }
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    ConvertUTCPipe,
    DashboardComponent,
    OrderTableComponent,
    DynamicPopupComponent,
    OrderDetailComponent
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  entryComponents: [
    DynamicPopupComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


/*
 
 
 
*/