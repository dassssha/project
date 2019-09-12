import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpService } from '../http.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  id: number;
  itemForm: FormGroup;
  Contact;

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
    this.itemForm = new FormGroup({
      name: new FormControl(),
      surname: new FormControl(),
      phone: new FormControl()
    }); 
  }


  async add() {
    this.Contact = await this.httpService.postContact(
      {
        "id": this.itemForm.value.id,
        "name": this.itemForm.value.name,
        "surname": this.itemForm.value.surname,
        "phone": this.itemForm.value.phone
      });
    this.router.navigate([`/`]);
  }


}
