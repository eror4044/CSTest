import { Component, OnInit } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { OwnerEntity } from 'src/OwnerEntity';
import { WebApiService } from 'src/services/WebApiService';

@Component({
  selector: 'app-car-owners-table',
  templateUrl: './car-owners-table.component.html',
  styleUrls: ['./car-owners-table.component.css']
})
export class CarOwnersTableComponent implements OnInit {

  constructor(private ms:InMemoryDbService,private ws:WebApiService) {
    this.ms.createDb()
    this.ws.getOwners().subscribe((data)=>{
      this.owners = data
      console.log(this.owners);
    })
  }

  editOwner(data:any):OwnerEntity{
   return this.ws.buferOwner = data
  }
  deleteOwner(owner:OwnerEntity){
   return this.ws.deleteOwner(owner.id).subscribe((data)=>{this.ws.getOwners().subscribe((data)=>{
    this.owners = data
    console.log(this.owners);
  });

   })
  }
  owners:OwnerEntity[] = []


  ngOnInit(): void {
  }

}
