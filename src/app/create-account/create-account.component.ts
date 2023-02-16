import { Component, OnInit } from '@angular/core';
import { CityList } from '../models/TunisaCity';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  cityList = new CityList();
  tunisiaCity = this.cityList.TunisiaCity;

  constructor() { }

  ngOnInit(): void {
    console.log(this.tunisiaCity)
  }

}
