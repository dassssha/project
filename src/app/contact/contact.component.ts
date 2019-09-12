import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, ReactiveFormsModule } from "@angular/forms";
import { HttpService } from "../http.service"

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  id: number;
  itemForm: FormGroup;
  Contact;
  Checked: string;


  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private httpService: HttpService
  ) {
      this.activatedRouter.params.subscribe(param => {
      this.id = param.id;
      });
    }

  ngOnInit() {
    this.getContact().then(() => { 
      console.log(this.Contact);
      this.itemForm = new FormGroup({
        name: new FormControl(this.Contact.name),
        surname: new FormControl(this.Contact.surname),
        phone: new FormControl(this.Contact.phone),
      });
    });
  }
//получем контакт по айди
  async getContact(){
    this.Contact = await this.httpService.getContactById(+this.id);
  }
//сохраняем форму
  async onSaveForm() {
    console.log(this.Contact.name);
    this.Contact = await this.httpService.putContactById(this.id, 
      {
        "id": this.Contact.id,
        "name": this.itemForm.value.name,
        "surname": this.itemForm.value.surname,
        "phone": this.itemForm.value.phone
      });
    console.log(this.Contact.name);
    this.router.navigate([`/`]);
  }
// удаление контакта по ид. Обращение к сервису http, в котором прописана ассинхронная функция обращения к серверу
  async onDelete(){
    this.Contact = await this.httpService.deleteContactById(this.id);
    this.router.navigate([`/`]);
  }  

}
