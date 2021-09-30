import { CustomerService } from './../../../_services/customer.service';
import { Order } from './../../../_models/order';
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
  selector: 'app-create-or-edit-order',
  templateUrl: './create-or-edit-order.component.html',
  styleUrls: ['./create-or-edit-order.component.scss']
})
export class CreateOrEditOrderComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @Output('modalSave') modalSave = new EventEmitter();
  @Input() areaList = [];
  @Input() currentUser = new Employee;
  @Input() disableInput = false;
  order: Order = new Order();
  OrderCode: string;
  OrderName: string;
  DeliveryAdd: string;
  Weight: number;
  Price: number;
  CreateDate;
  ReceiveDate;
  Status;
  ErrStatus;
  AreaId: number;
  CustomerId: number;
  UserId : number;

  cus: Customer = new Customer();
  CusName;
  CusTel;
  CusAdd;
  BirthDay;
  CusEmail;
  CusCmnd;
  isSuccess = false;
  OtherReason;
  isOther  = false;
  isReceive = false;
  statusList = [
    {label:"Mới tạo",value:"Mới tạo"},
    {label:"Đang giao",value:"Đang giao"},
    {label:"Thành công",value:"Thành công"},
    {label:"Không thành công",value:"Không thành công"},
  ];
  errList = [
    {label:"ko liên lạc được vs khách",value:"ko liên lạc được vs khách"},
    {label:"Khách ko nghe máy",value:"Khách ko nghe máy"},
    {label:"Khách hẹn lại giao trong ngày",value:"Khách hẹn lại giao trong ngày"},
    {label:"Khách đổi đc giao hàng",value:"Khách đổi đc giao hàng"},
    {label:"Lý do khác",value:"Lý do khác"},
  ];
          




  areaCodeList: any[]=[];

  // EmpTypes = [
  //   {
  //     label: 'Nhân viên trông xe',
  //     value: 2,
  //   },
  //   {
  //     label: 'Nhân viên quản lý',
  //     value: 1,
  //   },
  // ]

  constructor(private _cusService : CustomerService,private cacheService : CacheService) { }

  ngOnInit() {
  }

  hide() {
    this.CreateDate = undefined;
    this.ReceiveDate = undefined;
    this.isReceive = false;
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

  show(event?) {
    this.isOther = false;
    if (this.currentUser.RoleId == 1 ){
      this.statusList = [
        {label:"Mới tạo",value:"Mới tạo"},
        {label:"Đang giao",value:"Đang giao"},
        {label:"Thành công",value:"Thành công"},
        {label:"Không thành công",value:"Không thành công"},
      ];
    }
    else{
      this.statusList = [
        {label:"Thành công",value:"Thành công"},
        {label:"Không thành công",value:"Không thành công"},
      ];
    }
    this.getCacheData();
    this.order = new Order
    this.cus = new Customer
    let cusInput = new GetCusInputDto();
    this.CreateDate = moment();
    this.areaList = this.areaList.filter(e => e.value != 0);
    this.order.AreaId = 0;
    this.order.UserId = 0;
    this.Status = 'Mới tạo';
    this.ErrStatus = '';
    this.cus.AreaId = 1;

    if (event.Id) {
      this.order = event;
      this.CreateDate = new Date(moment(this.order?.CreateDate).format('DD-MM-yyyy'));
      this.Status = this.order.Status;
      this.ErrStatus = this.order.ErrStatus;
      this.ReceiveDate = new Date(moment(this.order?.ReceiveDate).format('DD-MM-yyyy'));;
      if (!this.errList.some(e => e.value === this.order.ErrStatus)){
        this.ErrStatus = "Lý do khác";
        this.OtherReason = this.order.ErrStatus;
      }
      if (this.Status != "Không thành công"){
        this.ErrStatus = "";
        this.order.ErrStatus ="";
        this.OtherReason = this.order.ErrStatus;
      }
      if (this.order.Status != "Mới tạo"){
        this.ErrStatus = "";
        this.order.ErrStatus ="";
        this.OtherReason = this.order.ErrStatus;
        this.statusList = [
          {label:"Đang giao",value:"Đang giao"},
          {label:"Thành công",value:"Thành công"},
          {label:"Không thành công",value:"Không thành công"},
        ];
      }
      if (this.order.Status == "Thành công" ){
        this.ErrStatus = "";
        this.order.ErrStatus ="";
        this.OtherReason = this.order.ErrStatus;
        this.isReceive = true;
      }
      // if (this.order.Status == "Thành công"){
      //   this.isSuccess = true;
      // }
      // else {  this.isSuccess = false;}

      cusInput.Id = this.order.CustomerId;
      this._cusService.getCustomerById(cusInput).subscribe(res => {
        if (res.length === 1){
          this.cus = res[0];
        }
      })
    }
    setTimeout(()=>{
      this.modal.show();
    }, 500);
    
  }

  changeCombobox(params){
    if (params != "Không thành công"){
      this.ErrStatus = "";
      this.order.ErrStatus ="";
      this.OtherReason = this.order.ErrStatus;
    }
  }
  setAdd(params){
    this.order.DeliveryAdd == params;
  }

  searchCustomer(){
    let cusInput = new GetCusInputDto();
    
    cusInput.CusName = '';
    cusInput.CusEmail =  '';
    cusInput.CusTel =  this.cus.CusTel ?? '';
    cusInput.CusCmnd =  '';
    cusInput.AreaId = 0;

    this._cusService.getCustomerByTel(cusInput).subscribe(res => {
      if (res.length === 1){
        alertify.success('Số điện thoại có sẵn ! Thông tin khách hàng sẽ được tự động cập nhật lên màn hình')
        // this.cus.CusName = res[0].CusName;
        // this.cus.CusEmail = res[0].CusEmail;
        // this.cus.CusCmnd = res[0].CusCmnd;
        // this.cus.CusAdd = res[0].CusAdd;
        // this.cus.AreaId = res[0].AreaId;
        this.cus = res[0];
        this.order.CustomerId = res[0].Id;
        this.order.DeliveryAdd= res[0].CusAdd;
      }
      else {
        let tel = this.cus.CusTel;
        this.cus = new Customer;
        this.cus.CusTel = tel;
        this.cus.AreaId = 1;
      }
    })
  }

  createOrEdit() {
    if (!this.checkValidate()) return;
    
    this.order.CreateDate = this.CreateDate;
    this.order.UserId = 0;
    this.order.Weight = this.order.Weight ?? 0;
    this.order.Price = this.order.Price ?? 0;
    this.order.Status = this.Status;
    this.order.ErrStatus = this.ErrStatus;
    if (!this.cus.Id){
      this.cus.CusEmail = this.cus.CusEmail ?? ""; 
      this._cusService.registerCustomer(this.cus)
      .subscribe(res => {
        let cusInput = new GetCusInputDto();
        cusInput.CusTel =  this.cus.CusTel ?? '';
        this._cusService.getCustomerByTel(cusInput).subscribe(res => {
          if (res.length == 1){
            this.cus = res[0];
            console.log(res[0].Id)
            this.order.CustomerId = res[0].Id;
            this.order.DeliveryAdd = res[0].CusAdd;
            this.modalSave.emit(this.order);
          }
        })
      }, er => console.log(er), () => {
      });
    }
    if (!this.order.Id){
      this.order.OrderCode = "HN." + this.areaCodeList.find(e => e.value == this.cus.AreaId)?.label + "." + moment().format("DDMMYY") ;
    }
    this.AreaId = this.cus.AreaId;
    if (this.Status != "Không thành công") {
      this.order.ErrStatus = '';
    }
    else {
      if (this.ErrStatus == "Lý do khác"){
        this.order.ErrStatus = this.OtherReason;
      }
    }
    if (this.order.CustomerId)
      this.modalSave.emit(this.order);
    this.modal.hide();
  }

  checkValidate() {
    if (!this.order?.OrderName || this.order?.OrderName === '') {
      alertify.error('Tên đơn hàng không được trống');
      return false;
    }
    if (!this.order?.Price ) {
      alertify.error('Đơn giá không được trống');
      return false;
    }
    if (this.order?.Price <= 0 ) {
      alertify.error('Đơn giá không được phép nhỏ hơn 0');
      return false;
    }
    if (this.order?.Weight <= 0 ) {
      alertify.error('Cân nặng không được phép nhỏ hơn 0');
      return false;
    }
    // if (!this.order?.DeliveryAdd || this.order?.DeliveryAdd === '') {
    //   alertify.error('Địa chỉ giao không được trống');
    //   return false;
    // }
    if (!this.cus?.CusTel || this.cus?.CusTel == '') {
      alertify.error('Số điện thoại người nhận không được để trống');
      return false;
    }
    if (!this.cus?.CusName || this.cus?.CusName == '') {
      alertify.error('Tên Khách hàng không được trống');
      return false;
    }
    if (!this.cus?.CusAdd || this.cus?.CusAdd == '') {
      alertify.error('Địa chỉ khách hàng không được trống');
      return false;
    }
    if (this.order?.ReceiveDate && moment(this.order?.ReceiveDate).isBefore(this.order?.CreateDate) ) {
      alertify.error('Ngày nhận đơn không được phép bé hơn ngày tạo ');
      return false;
    }
    return true;
  }
}
