import { RouterModule, Routes } from "@angular/router";

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/service.index';
import { AdminGuard } from '../services/guards/admin.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { SearchComponent } from './search/search.component';


const pagesRoutes: Routes = [
    { 
        path: '', 
        component: PagesComponent,
        canActivate: [ LoginGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: {title: 'Progress'} },
            { path: 'graficas1', component: Graficas1Component, data: {title: 'Graphics'} },
            { path: 'promises', component: PromisesComponent, data: {title: 'Promises'} },
            { path: 'rxjs', component: RxjsComponent, data: {title: 'Observables'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Account Settings'} },
            { path: 'profile', component: ProfileComponent, data: {title: 'User Profile'} },
            { path: 'search/:term', component: SearchComponent, data: {title: 'Searching'} },

            // Maintenance
            { 
                path: 'users', 
                component: UsersComponent, 
                canActivate: [ AdminGuard ],
                data: {title: 'Users Maintence'} 
            },
            { path: 'hospitals', component: HospitalsComponent, data: {title: 'Hospitals Maintence'} },
            { path: 'doctors', component: DoctorsComponent, data: {title: 'Doctors Maintence'} },
            { path: 'doctor/:id', component: DoctorComponent, data: {title: 'Update Doctor'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    }
]

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );