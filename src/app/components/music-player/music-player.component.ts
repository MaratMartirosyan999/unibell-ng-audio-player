import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from "moment/moment";
import {Music} from "../../models/music";
import {MAX_VOLUME} from "../../constants/constants";

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit {
  musicDuration!: number;
  audio = new Audio();
  volume = MAX_VOLUME;
  isMuted = false;
  previousVolume?: number;
  musicLength: string = '0:00';
  currentTime: string = '0:00';

  @Output() prevClicked = new EventEmitter<boolean>();
  @Output() nextClicked = new EventEmitter<boolean>();
  @Input() isPrevDisabled = false;
  @Input() isNextDisabled = false;
  _music!: Music;
  @Input()
  set music(music: Music) {
    if (!music) {
      return
    }
    if (!this._music || this._music.id !== music.id) {
      this._music = music;
      this.audio.src = this._music.url;
    }
    this.onPlay();
  }

  get music(): Music {
    return this._music;
  }

  ngOnInit(): void {
    this.initAudioListeners()
  }

  private initAudioListeners(): void {
    this.audio.ondurationchange = () => {
      const totalSeconds = Math.floor(this.audio.duration);
      const duration = moment.duration(totalSeconds, 'seconds');

      this.musicLength = duration.seconds() < 10
        ? `${Math.floor(duration.asMinutes())}:0${duration.seconds()}`
        : `${Math.floor(duration.asMinutes())}:${duration.seconds()}`;
      this.musicDuration = totalSeconds;
    }

    this.audio.ontimeupdate = () => {
      const duration = moment.duration(Math.floor(this.audio.currentTime), 'seconds');
      this.currentTime = duration.seconds() < 10
        ? `${Math.floor(duration.asMinutes())}:0${duration.seconds()}`
        : `${Math.floor(duration.asMinutes())}:${duration.seconds()}`;
    }
  }

  onPlay(): void {
    if (this.audio.paused && this.audio.src) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  onVolumeChange(): void {
    this.audio.volume = this.volume / MAX_VOLUME;
  }

  onMute(): void {
    if (this.volume !== 0) {
      this.previousVolume = this.volume;
      this.volume = 0;
    } else {
      this.volume = this.previousVolume || 1;
    }

    this.onVolumeChange();
    this.isMuted = this.volume === 0;
  }

  protected readonly MAX_VOLUME = MAX_VOLUME;
}
