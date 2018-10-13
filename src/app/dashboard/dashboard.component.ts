import { Component, OnInit } from '@angular/core';
import { IncomeEgressService } from '../income-egress/income-egress.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(private _incomeEgressService: IncomeEgressService) { }

  ngOnInit() {
    this._incomeEgressService.initIncomeEgressListener();
  }

}
