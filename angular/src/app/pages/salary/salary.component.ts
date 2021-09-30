import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationParamsModel } from 'src/app/_components/shared/common/models/base.model';
import { UserService } from 'src/app/_services/user.service';
import { ceil } from 'lodash';
import * as moment from 'moment';
import { GetShippersInputDto } from 'src/app/_models/get-shippers-input-dto';
import { CustomerService } from 'src/app/_services/customer.service';
import { GetCusInputDto } from 'src/app/_models/get-cus-input-dto';
import { Customer } from 'src/app/_models/customer';
import { CacheService } from 'src/app/_services/cache.service';
import { SalaryService } from 'src/app/_services/salary.service';
import { GetSalaryInputDto } from 'src/app/_models/get-salary-input-dto';
import { AuthenticationService } from 'src/app/_services/authentication.service';
declare let alertify: any;
@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss'],
})
export class SalaryComponent implements OnInit {
  paginationParams: PaginationParamsModel;

  columnsDef;
  defaultColDef;
  rowData = [];
  pagedRowData = [];
  params: any;
  user;
  selectedData;
  month= moment().month() ;
  year= moment().year();
  cusEmail: string;
  cusTel: string;
  cusCmnd: string;
  areaList: any[]=[];
  areaId : number = 0;
  listMonth =[
    {value:1,label:1},
    {value:2,label:2},
    {value:3,label:3},
    {value:4,label:4},
    {value:5,label:5},
    {value:6,label:6},
    {value:7,label:7},
    {value:8,label:8},
    {value:9,label:9},
    {value:10,label:10},
    {value:11,label:11},
    {value:12,label:12},
  ];
  listYear =[
  ];
  currentUser;

  constructor(private _salaryService: SalaryService,private _cacheService: CacheService,private authenticationService: AuthenticationService) {
    this.columnsDef = [
      {
        headerName: 'STT',
        field: 'stt',
        cellRenderer: (params) =>
          (this.paginationParams.pageNum - 1) * this.paginationParams.pageSize +
          params.rowIndex +
          1,
      },
      {
        headerName: 'Tên Shipper',
        field: 'FullName',
      },
      {
        headerName: 'Số đơn ',
        field: 'SoDon',
      },
      {
        headerName: 'Tiền thưởng tháng',
        field: 'TienThuong',
      },
      {
        headerName: 'Tiền phạt tháng',
        field: 'TienPhat',
      },
      {
        headerName: 'Lương',
        field: 'TienLuong',
      },
    ];

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
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit() {
    this.listYear
    this.paginationParams = { pageNum: 1, pageSize: 10, totalCount: 0 };
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.listYear.push({label:moment().add(-1, 'y').year(),value:moment().add(-1, 'y').year()})
    for (var i = 0 ;i<10 ; i++ ){
      this.listYear.push({label:moment().add(i, 'y').year(),value:moment().add(i, 'y').year()})
    }
    this.getCacheData();
  }

  getCacheData(){
    this.areaList = [];
    this._cacheService.getArea().subscribe(res => {
      this.areaList.push({label:"Tất cả",value:0});
      res.forEach(e => this.areaList!.push({
        label: e.AreaName!,
        value: e.Id!,
      }))
    })
  }

  onSearch() {
    this.callBackEvent(this.params);
  }

  callBackEvent(event) {
    this.params = event;
    var s = new GetSalaryInputDto();
    s.Month = this.month ?? Number(moment().month());
    s.Year = this.year ?? Number(moment().year());

    this._salaryService.getSalary(s).subscribe((res) => {
      this.rowData = res;
      console.log(res);
      if(this.currentUser.RoleId == 2){
        this.rowData  = res.filter(e => e.Id == this.currentUser.Id);
      }
      this.pagedRowData =
        this.rowData.length > 0
          ? this.rowData.slice(
            (this.paginationParams.pageNum - 1) *
            this.paginationParams.pageSize,
            this.paginationParams.pageNum * this.paginationParams.pageSize
          )
          : [];
      this.paginationParams.totalCount = this.rowData.length;
      this.paginationParams.totalPage = ceil(
        this.rowData.length / this.paginationParams.pageSize
      );
      this.paginationParams.pageNum = 1;
    });
  }

  changePaginationParams(paginationParams: PaginationParamsModel) {
    this.paginationParams = paginationParams;
    this.paginationParams.skipCount =
      (paginationParams.pageNum - 1) * paginationParams.pageSize;
    this.paginationParams.pageSize = paginationParams.pageSize;
    var s = new GetSalaryInputDto();
    s.Month = this.month ?? Number(moment().month());
    s.Year = this.year ?? Number(moment().year());

    this._salaryService.getSalary(s).subscribe((res) => {
      this.rowData = res;
      if(this.currentUser.RoleId == 2){
        this.rowData  = res.filter(e => e.Id == this.currentUser.Id);
      }
      this.pagedRowData = this.rowData
        ? this.rowData.slice(
          this.paginationParams.skipCount,
          this.paginationParams.pageNum * this.paginationParams.pageSize
        )
        : [];
    });
    this.params.api?.setRowData(this.pagedRowData);
  }

  onChangeSelection(params) {
    const selectedData = params.api.getSelectedRows();
    if (selectedData) this.selectedData = selectedData[0];
  }

  exportExcel(){
    this.params.api.exportDataAsCsv();
  }

  // modalSave(event) {
  //   console.log(event);
  //   if (event.Id) {
  //     this._customerService.updateCustomer(event).subscribe(res => {
  //     }, er => console.log(er), () => {
  //       this.callBackEvent(this.params);
  //     });
  //     alertify.success('Cập nhật thành công');
  //     this.callBackEvent(this.params);
  //     this.selectedData = undefined;
  //   } else {
  //     this._customerService.registerCustomer(event).subscribe(res => { }, err => console.log(err), () => this.callBackEvent(this.params));
  //     alertify.success('Thêm mới thành công');
  //     this.callBackEvent(this.params);
  //     this.selectedData = undefined;
  //   }
  // }
}
