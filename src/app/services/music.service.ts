import {Injectable} from '@angular/core';
import {musicData} from "../mock-data/music-data";
import {Observable, of} from "rxjs";
import {Music} from "../models/music";

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private musics = musicData;

  getAll(): Observable<Music[]> {
    return of(this.musics)
  }
}
