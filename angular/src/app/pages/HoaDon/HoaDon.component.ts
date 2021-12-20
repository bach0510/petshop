import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationParamsModel } from 'src/app/_components/shared/common/models/base.model';
import { ceil } from 'lodash';

import { CreateOrEditHoaDonComponent } from './create-or-edit-order/create-or-edit-HoaDon.component';
import { HoaDonService } from 'src/app/_services/HoaDon.service';
import { GetHoaDonInput } from 'src/app/_models/GetHoaDonInput';
import { HoaDon } from 'src/app/_models/HoaDon';
import * as moment from 'moment';
declare let alertify: any;
@Component({
  selector: 'app-HoaDon',
  templateUrl: './HoaDon.component.html',
  styleUrls: ['./HoaDon.component.scss'],
})
export class HoaDonComponent implements OnInit {
  @ViewChild('createOrEditHoaDon', { static: true }) createOrEditHoaDon: CreateOrEditHoaDonComponent;
  paginationParams: PaginationParamsModel;

  columnsDef;
  defaultColDef;
  rowData = [];
  pagedRowData = [];
  params: any;
  user;


  selectedData;
  MAHD: string;
  NGUOILAPHD: string;
  NGAYLAP: Date;
  MAKH: string;
  MAKM: string;
  giaKhuyenMai: number;
  tong: number;

  searchType= [
    {value:1,label:"daonh thu"},
    {value:2,label:"danh sách hóa đơn "},
  ];
  type : number = 1;
  filter = "";
  fromdate = "";
  todate = "";
  tongTien = 0;

  detailColDef;

  rowDataDetail = [];

  constructor(private HoaDonService: HoaDonService,) {
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
        headerName: 'Mã hóa đơn',
        field: 'MAHD',
      },
      {
        headerName: 'người lập hóa đơn',
        field: 'NGUOILAPHD',
      },
      {
        headerName: 'ngày lập',
        field: 'NGAYLAP',
      },
      {
        headerName: 'Mã Khách hàng',
        field: 'MAKH',
      },
      {
        headerName: 'Mã Khuyến mại',
        field: 'MAKM',
      },
      // {
      //   headerName: 'tổng',
      //   field: 'tong',
      // },

    ];

    this.detailColDef = [
      {
        headerName: 'Tên SP',
        field: 'ten',
      },
      {
        headerName: 'Số lượng',
        field: 'soLuong',
      },
      {
        headerName: 'Đơn giá',
        field: 'gia',
      },

    ]

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

  }

  ngOnInit() {
    this.paginationParams = { pageNum: 1, pageSize: 10, totalCount: 0 };
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  onSearch() {
    console.log(this.todate)
    console.log(this.fromdate)
    this.callBackEvent(this.params);
  }

  callBackEvent(event) {
    this.params = event;
    var HoaDon = new GetHoaDonInput();
    HoaDon.Value = this.type ?? 3;
    // HoaDon.FromDate = moment(this.fromdate ?? '01/01/1999').format("dd/mm/yyyy").toString()  ?? '';
    // HoaDon.ToDate = moment(this.todate ?? moment()).format("dd/mm/yyyy").toString()  ?? '';

    HoaDon.FromDate = moment(this.fromdate ?? '01/01/1999',"DD/MM/YYYY").format('L').toString()  ?? '';
    HoaDon.ToDate = moment(this.todate ?? moment(),"DD/MM/YYYY").format('L').toString()  ?? '';

    this.HoaDonService.getHoaDon(HoaDon).subscribe((res) => {
      this.rowData = res;
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

    var HoaDon = new GetHoaDonInput();
    HoaDon.Value = this.type ?? 3;
    HoaDon.FromDate = moment(this.fromdate ?? '01/01/1999',"DD/MM/YYYY").format('L').toString()  ?? '';
    HoaDon.ToDate = moment(this.todate ?? moment(),"DD/MM/YYYY").format('L').toString()  ?? '';

    this.HoaDonService.getHoaDon(HoaDon).subscribe((res) => {
      this.rowData = res;
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
    this.tongTien = this.selectedData?.tong ?? 0;
    console.log(this.selectedData)
    var HoaDon = new GetHoaDonInput();
    HoaDon.MaHd = this.selectedData.MAHD ?? 0;
    this.HoaDonService.getChiTietHoaDon(HoaDon).subscribe(res => {
        this.rowDataDetail = res;
        console.log(this.rowDataDetail)
    })
  }

  getVehicleCard() {
    this.callBackEvent(this.params);
  }

  add() {
    this.selectedData = new HoaDon();
    this.createOrEditHoaDon.show(this.selectedData);
  }

  edit() {
    this.createOrEditHoaDon.show(this.selectedData);
  }

  // delete() {
  //   this.HoaDonService
  //     .deleteHoaDon(this.selectedData)
  //     .subscribe(
  //       (res) => {
  //         alertify.success('Xóa đơn hàng thành công');
  //         this.callBackEvent(this.params);
  //       },
  //       (err) => console.log(err)
  //     );
  // }
  deleteHoadon(){

  }

  base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }


  modalSave(event){

  }
  // modalSave(event) {
  //   console.log(event);

  //   if (event.masp) {
  //     this.HoaDonService.updatePet(event).subscribe(res => {
  //     }, er => console.log(er), () => {
  //       this.callBackEvent(this.params);
  //     });
  //     alertify.success('Cập nhật thành công');
  //     this.callBackEvent(this.params);
  //     this.selectedData = undefined;
  //   } else {
  //     this.HoaDonService.registerPet(event).subscribe(res => { }, err => console.log(err), () => this.callBackEvent(this.params));
  //     alertify.success('Thêm mới thành công');
  //     this.callBackEvent(this.params);
  //     this.selectedData = undefined;
  //   }
  // }

  exportExcel(){
    this.params.api.exportDataAsCsv();
  }
}
