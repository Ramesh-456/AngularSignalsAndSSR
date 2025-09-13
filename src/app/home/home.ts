import { CommonModule } from '@angular/common';
import { HttpClient, httpResource } from '@angular/common/http';
import { Component, linkedSignal, OnInit, resource, signal, Signal } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';


@Component({
  selector: 'app-home',
  imports: [CommonModule,ButtonModule,CardModule,SkeletonModule,CarouselModule,TagModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  ngOnInit(): void {
   console.log("Home component initialized");
  }
   responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '1199px',
                numVisible: 3,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '575px',
                numVisible: 1,
                numScroll: 1
            }
        ]
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
  selectedUserData = httpResource<any[]>(() => this.selectedUser() === 0 ? undefined : `https://jsonplaceholder.typicode.com/albums?userId=${this.selectedUser()}`);

   getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
                default:
                return 'info';
        }
    }

    selectedUserAlbum = linkedSignal({
      source: this.selectedUser,
      computation: () => {  
        return 0;
      }
    });
    selectedUserAlbumData = httpResource<any[]>(() => this.selectedUserAlbum() === 0 ? undefined : `https://jsonplaceholder.typicode.com/photos?albumId=${this.selectedUserAlbum()}`);
}
