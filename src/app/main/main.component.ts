import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { HttpService } from '../http.service';
import { FormControl, FormGroup } from '@angular/forms';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
 
  
  Contacts = [];
  searchstring:string = '';
  sortParam:string;
  sortForm: FormGroup;


  constructor(private httpService: HttpService) { 
      this.sortForm = new FormGroup({
        sort: new FormControl(null)
      });
    }

    async ngOnInit() {
      try {
        let Contacts = this.httpService.getContacts();//получаем список контактов в массив контакс
        // this.searchstring = this.searchstring.toLowerCase();
        this.Contacts = (isNullOrUndefined(await Contacts)) ? [] : await Contacts;//проверяем на ошибки
        console.log(Contacts);//выводим в консоле этот массив

        // let sort = this.httpService.getSort();
      	// this.sortParam = (isNullOrUndefined(await sort)) ? "" : await sort;
			  // this.sortParam = this.sortParam[0]["param"];
			  
			  // let filter = this.httpService.getFilter();
      	// this.searchstring = (isNullOrUndefined(await filter)) ? "" : await filter;
      	// this.searchstring = this.searchstring[0]["param"];

      	// this.sortForm.patchValue({
        // 	sort: this.sortParam
        // });
        
        // console.log(this.searchstring);
        
      } catch (err) {
        console.log(err);
      }
    }

    async sorting() {
      this.sortParam = this.sortForm.value.sort;
      await this.httpService.putSort({ "id": 0, "param": this.sortParam });
    }
  
    async filtering() {
      await this.httpService.putFilter({ "id": 0, "param": this.searchstring });
    }
}
