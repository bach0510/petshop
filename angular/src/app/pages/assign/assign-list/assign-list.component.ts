import { CustomerService } from '../../../_services/customer.service';
import { Order } from '../../../_models/order';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Customer } from 'src/app/_models/customer';
import { Employee } from 'src/app/_models/employee';
import { GetCusInputDto } from 'src/app/_models/get-cus-input-dto';
import { CacheService } from 'src/app/_services/cache.service';
import { finalize } from 'rxjs/operators';
declare let alertify: any;

@Component({
  selector: 'app-assign-list',
  templateUrl: './assign-list.component.html',
  styleUrls: ['./assign-list.component.scss']
})
export class AssignListComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @Output('modalSave') modalSave = new EventEmitter();
  orderList = [];
  currentUser = new Employee;
  shipper : any;
  order: Order = new Order();
  OrderCode: string;
  OrderName: string;
  DeliveryAdd: string;
  Weight: number;
  Price: number;
  CreateDate = moment();
  ReceiveDate = moment();
  Status;
  ErrStatus; 
  AreaId: number;
  CustomerId: number;
  UserId : number;

  FullName;
  Username;
  EmpType;
  BirthDay;
  Password;
  RegisterNo;
  EmpTypes = [
    {
      label: 'Ship lấy',
      value: 'Ship lấy',
    },
    {
      label: 'Ship giao',
      value: 'Ship giao',
    },
  ]

  columnsDef: any;
  defaultColDef : any;

  statusList = [
    {label:"Mới tạo",value:"Mới tạo"},
    {label:"Đang giao",value:"Đang giao"},
    {label:"Thành công",value:"Thành công"},
    {label:"Không thành công",value:"Không thành công"},
  ];
  errList = [
    {label:"Tốt",value:"Tốt"},
    {label:"Sai hàng",value:"Sai hàng"},
    {label:"Hỏng hóc",value:"Hỏng hóc"},
  ];

  areaCodeList: any[]=[];

  constructor(private _cusService : CustomerService,private cacheService : CacheService) { 
    this.columnsDef = [
      {
        headerName: 'STT',
        field: 'stt',
        cellRenderer: (params) =>
          params.rowIndex +
          1,
      },

      {
        headerName: 'Mã vận đơn',
        field: 'OrderCode',
      },
      {
        headerName: 'Tên đơn hàng',
        field: 'OrderName',
      },
      {
        headerName: 'Cân nặng',
        field: 'Weight',
      },
      {
        headerName: 'Giá',
        field: 'Price',
      },
      // {
      //   headerName: 'Shipper giao',
      //   field: 'UserId',
      // },
      {
        headerName: 'Địa chỉ giao',
        field: 'DeliveryAdd',
      },
      {
        headerName: 'Ngày tạo',
        field: 'CreateDate',
      },
      {
        headerName: 'Ngày KH nhận',
        field: 'ReceiveDate',
      },
      {
        headerName: 'Trạng thái',
        field: 'Status',
      },
      {
        headerName: 'Tình trạng',
        field: 'ErrStatus',
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
      }
    }
  }

  ngOnInit() {
  }

  hide() {
    this.modal.hide();
  }

  getCacheData(){
    this.areaCodeList = [];
    this.cacheService.getArea().subscribe(res => {
      res.forEach(e => this.areaCodeList!.push({
        label: e.AreaCode!,
        value: e.Id!,
      }))
    })
  }

  show(params? : any) {
    this.getCacheData();
    console.log(params)
    this.shipper = params ?? new Employee;
    this.orderList = params.OrderList ?? [];
    this.modal.show();
  }


}
