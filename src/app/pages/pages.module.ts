import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

//Rutas
import { PAGES_ROUTES } from './pages.routes';

//Modulos
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';

//temporal
import { IncrementComponent } from '../components/increment/increment.component';
import { DoughnutchartComponent } from '../components/doughnutchart/doughnutchart.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementComponent,
        DoughnutchartComponent,
        AccountSettingsComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule {}