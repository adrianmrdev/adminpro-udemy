import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SettingsService, SharedService, SidebarService, UserService, LoginGuard } from './service.index';
import { UploadFileService } from './uploadFile/upload-file.service';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalService } from './hospital/hospital.service';
import { DoctorService } from './doctor/doctor.service';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UserService,
    LoginGuard,
    AdminGuard,
    UploadFileService,
    HospitalService,
    DoctorService,
    ModalUploadService,
  ]
})
export class ServiceModule { }
