import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { MapaComponent } from '../mapa/mapa.component';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.scss']
})
export class ViajesComponent implements OnInit {

  travelList: AngularFireList<any>;
  travels: Array<any>;
  userList: AngularFireList<any>;
  user: Array<any>;
  $userId: string;
  travelForUser: Array<any>;

  constructor(public firebase:AngularFireDatabase, private router: Router) {

    this.travelList = this.firebase.list('viajes');
    this.travels = [];
    this.userList = this.firebase.list('users');
    this.user = [];
    this.$userId = '';
    this.travelForUser = [];
    this.getDataTable();
  }
  
  ngOnInit(): void {
  }
  
  getDataTable() {
    this.userList.snapshotChanges().subscribe(item => {
      item.forEach(user => {
        const x: any = user.payload.toJSON();
          this.$userId = user.key ? user.key : '';
        // }
      });
    });
    this.travelList.snapshotChanges().subscribe(item => {
      this.travels = [];
      item.forEach(t => {
        let x = t.payload.toJSON();
        this.travels.push(x);
      });
      this.travelForUser = [];
      this.travels.forEach((item)=>{
        if(item.user === this.$userId) {
          this.travelForUser.push(item);
        }
      })
    });
  }

}
