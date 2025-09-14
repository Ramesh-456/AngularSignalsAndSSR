import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Album {

  async getAlbumPhotos() {
     const response = await fetch('https://jsonplaceholder.typicode.com/photos');
     return response.json();
  }
  
}
