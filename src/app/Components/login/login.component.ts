import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  public myClass:boolean = true;



  usersList: AngularFireList<any>;
  
  users: Array<any>;
  
  userData: {
    $key?: string,
    username: string;
    email: string;
    password: string;
  }

  constructor(public firebase: AngularFireDatabase, private router:Router) { 

    this.userData = {
      $key: '',
      username: '',
      email: '',
      password: '',
    };

    this.usersList = this.firebase.list('users')

    this.users = [];

    this.usersList.snapshotChanges().subscribe(item => {
      this.users = []
      item.forEach(user => {
        let x: any = user.payload.toJSON();
        x["$key"] = user.key
        this.users.push(x)
      })
      console.log('USERS', this.users)
    })

  }


  saveUser() {
    if (this.userData.$key == '') {
      delete this.userData.$key;
      this.usersList.push(this.userData)
      // this.limpiarProducto()
      alert('USUARIO REGISTRADO EXITOSAMENTE')
    }else{
    //   let keyTemp = this.productForm.$key? this.productForm.$key : '';

    //   delete this.productForm.$key;

    //   this.productosList.update(keyTemp,this.productForm)
    //   this.limpiarProducto()
      alert('USUARIO EXISTENTE')
    // }

    console.log('USUARIO EN EL FORMULARIO', this.userData)
  }
  }

  iniciarSesion(){
    
    let usuarioCorrecto = this.users.filter(user => user.email === this.email && user.password === this.password)
    
    if (usuarioCorrecto.length > 0){
      alert('Credenciales correctas')
      this.irMapa()
      
    } else {
      alert('Credenciales incorrectas')
    }

  }

  cambiarClase(){
    this.myClass = !this.myClass
  }

  irMapa(){
    this.router.navigateByUrl('/mapa')
  }


  
  ngOnInit(): void {
  }

}
