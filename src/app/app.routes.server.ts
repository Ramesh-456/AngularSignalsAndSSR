import { inject } from '@angular/core';
import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { Album } from './album';
import { httpResource } from '@angular/common/http';

export const serverRoutes: ServerRoute[] = [
    {
    path: 'home',
    renderMode: RenderMode.Server
  },
     {path:'photos/:id',
        renderMode: RenderMode.Prerender,
        //if prerender not available, then fallback to client rendering
        fallback: PrerenderFallback.Client,
      async getPrerenderParams() {
      const album = inject(Album);
      // Fetch album ids from the Album service
      const photos: any[] = await album.getAlbumPhotos();
     const  ids= photos.map(album => album.id) || [];
     // Return an array of route parameters for prerendering
      return ids.filter(value=>value<=10).map(id => {return { id:id.toString() };});  // Generates paths like: /photos/1, /photos/2, /photos/3
    // return [{id : '1'},{id : '2'},{id : '3'}];
    }
      },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
