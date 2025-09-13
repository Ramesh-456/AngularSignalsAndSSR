import { CommonModule } from '@angular/common';
import { HttpClient, httpResource } from '@angular/common/http';
import { Component, OnInit, resource, signal, Signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  ngOnInit(): void {
   console.log("Home component initialized");
  }
  userDatas = resource({
    loader: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      return await response.json();
    }
  })
  selectedUser = signal(0);

  // selectedUserData = resource({
  //   params: this.selectedUser,
  //   loader: async ({ params: id }) => {
  //     if (id === 0) { return null; }
  //     const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  //     return await response.json();
  //   }
  // })
  selectedUserData = httpResource<any>(() => this.selectedUser() === 0 ? undefined : `https://jsonplaceholder.typicode.com/users/${this.selectedUser()}`);

}
