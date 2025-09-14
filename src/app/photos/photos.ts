import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, inject, linkedSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from 'primeng/button';
import { Carousel } from 'primeng/carousel';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-photos',
  imports: [Carousel,Button,Tag,CommonModule],
  templateUrl: './photos.html',
  styleUrl: './photos.css'
})
export class Photos {
  private route = inject(ActivatedRoute);

  // Signal to hold the current album id from route params
  albumId = computed( () => {
    let id: unknown;
    this.route.params.subscribe(params => {
      id = params['id'];
    });
    return typeof id === 'string' ? Number(id) : undefined;
  });

  selectedUserAlbum = computed(() => this.albumId());

  selectedUserAlbumData = httpResource<any[]>(() => {
    const albumId = this.selectedUserAlbum();
    return albumId === 0 || albumId === undefined
      ? undefined
      : `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`;
  });

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
}
