import {Component, inject, OnInit} from '@angular/core';
import {MusicService} from "../../services/music.service";
import {Music} from "../../models/music";

@Component({
  selector: 'app-music-library',
  templateUrl: './music-library.component.html',
  styleUrls: ['./music-library.component.css']
})
export class MusicLibraryComponent implements OnInit {
  musicService = inject(MusicService)

  musicList: Music[] = [];
  displayedColumns: string[] = ['id', 'title', 'fileName'];
  selectedMusic!: Music;
  selectedIndex!: number;
  isPrevDisabled = false;
  isNextDisabled = false;

  ngOnInit(): void {
    this.musicService.getAll().subscribe(musics => {
      this.musicList = musics;
    })
  }

  onRowClick(index: number): void {
    this.selectedIndex = index;
    this.selectedMusic = {...this.musicList[index]};
    this.updateButtonsDisability();
  }

  onPrevClick(): void {
    this.selectedMusic = this.musicList[--this.selectedIndex];
    this.updateButtonsDisability();
  }

  onNextClick(): void {
    this.selectedMusic = this.musicList[++this.selectedIndex];
    this.updateButtonsDisability();
  }

  private updateButtonsDisability(): void {
    this.isPrevDisabled = this.selectedIndex === 0;
    this.isNextDisabled = this.selectedIndex === this.musicList.length - 1;
  }
}
