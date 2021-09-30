import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationParamsModel } from 'src/app/_components/shared/common/models/base.model';
import { UserService } from 'src/app/_services/user.service';
import { ceil } from 'lodash';
import * as moment from 'moment';
import { GetShippersInputDto } from 'src/app/_models/get-shippers-input-dto';
import { CacheService } from 'src/app/_services/cache.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { eventNames } from 'process';
import { NhanVien } from 'src/app/_models/nhan-vien';
declare let alertify: any;
@Component({
  selector: 'app-log-info',
  templateUrl: './log-info.component.html',
  styleUrls: ['./log-info.component.scss'],
})
export class LogInfoComponent implements OnInit {
  paginationParams: PaginationParamsModel;

  columnsDef;
  defaultColDef;
  rowData = [];
  pagedRowData = [];
  params: any;
  user;
  selectedData;
  fullName: string;
  email: string;
  tel: string;
  code: string;
  registerNo  : string;
  cmnd: string;
  areaList: any[]=[];
  areaId : number = 0;
  employee:NhanVien;
  url:any;

  MaNv: string;
  NgaySinh ;
  ChucVu: string;
  Sdt: string;
  Cmnd: string;
  Luong: number;
  DiaChi: string;
  GioiTinh: string;
  HoTen: string;
  Token: string;

  genderList =[{label:"Nam",value:"Nam"},{label:"Nữ",value:"Nữ"}]

  constructor(private _employeeService: UserService,private _cacheService: CacheService,private authenticationService: AuthenticationService) {


    this.defaultColDef = {
      flex: 1,
      resizable: true,
      suppressMenu: true,
      menuTabs: [],
      tooltipValueGetter: (t: any) => t.value,
      textFormatter: function (r) {
        if (r == null) return null;
        return r.toLowerCase();
      },
    };
    this.authenticationService.currentUser
    .subscribe(
      (x) => {
        this.employee = x;
        
      }
    );
  }

  ngOnInit() {
    this.paginationParams = { pageNum: 1, pageSize: 10, totalCount: 0 };
    this.user = JSON.parse(localStorage.getItem('currentUser'));

  }
  save(event) {

    // event.MaNv = event.ImageString ?? "";
    // event.EmpCode = event.EmpCode ?? event.Id.toString();
    // event.Username = event.Username ?? event.EmpCode;
    // event.Password =  event.Password ?? '1';
    // event.Tel =  event.Tel ?? '';
    // event.Email =  event.Email ?? '';
    // event.RegisterNo =  event.RegisterNo ?? '';
    // event.Cmnd =  event.Cmnd ?? '';
    // event.Type = event.Type ?? 'Ship lấy';
    // event.AreaId = event.AreaId;
    if (event.MaNv) {
      this._employeeService.updateEmployee(event).subscribe(res => {
      }, er => console.log(er), () => {
      });
      alertify.success('Cập nhật thành công');
      this.selectedData = undefined;
    }
  }
}
