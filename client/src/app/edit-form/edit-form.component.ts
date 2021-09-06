import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OwnerEntity } from 'src/OwnerEntity';
import { WebApiService } from 'src/services/WebApiService';


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  carsForm: FormGroup
  constructor(private fb: FormBuilder,private ws:WebApiService,private router: Router) {
    this.carsForm = new FormGroup({})
  }
  //вызываеться при переходе на форму редактирования
  ngOnInit(){
    //buferOwner это данные из таблицы с данными они храняться в сервисе
    //если buferOwner не пустой то из него подгружаются данные на новую форму
    if (this.ws.buferOwner?.firstName) {
      console.log(`buferOwner: ${this.ws.buferOwner}`);
      this.carsForm = this.fb.group({
        FirstName: [this.ws.buferOwner.firstName,[Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
        MiddleName: [this.ws.buferOwner.middleName,[Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
        LastName: [this.ws.buferOwner.lastName,[Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
        cars: this.fb.array(this.ws.buferOwner.cars)
      })
     this.ws.buferOwner = undefined
    }else{
      this.carsForm = this.fb.group({
        FirstName:  ['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
        MiddleName: ['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
        LastName:   ['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
        cars: this.fb.array([])
      })
    }
    this.carsForm.valueChanges.subscribe((data)=>{
      this.carsForm.valid ? console.log(data):console.log('no valid');

    })
  }
  onSubmit() {
    const newOwner:OwnerEntity = {
      id:this.carsForm.value.id,
      firstName:this.carsForm.value.FirstName,
      middleName:this.carsForm.value.MiddleName,
      lastName:this.carsForm.value.LastName,
      cars:this.carsForm.value.cars
    }
    if (this.ws.buferOwner) {
      console.log('edit');
      return this.ws.editOwner(newOwner)
    }
    return this.ws.createOwner(newOwner.firstName,newOwner.middleName,newOwner.lastName,newOwner.cars)
    .subscribe(()=>{console.log('owner was created'); this.router.navigate(['/home'])})

 }

  //добавление формы
  addCar() {
     (this.carsForm.get('cars') as FormArray).push(this.fb.group({
      id: ['', [Validators.required,Validators.pattern('[A-Z]{2}[0-9]{4}[A-Z]{2}')]],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      productionYear:['',[Validators.required,Validators.min(1900),Validators.pattern('[0-9]{4}')]]
    }))
  }
  //удаление формы
  removeFormControl(i: number) {
    let carsArray = this.carsForm.get('cars') as FormArray;
    console.log(carsArray);

    carsArray.removeAt(i);
  }

  get carsList() {
    return (this.carsForm.get('cars') as FormArray)
  }


}
