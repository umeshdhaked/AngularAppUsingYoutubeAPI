import { Component, OnInit } from '@angular/core';
import {YoutubeService} from '../youtube.service';
import {SafeUrl, DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-show-video',
  templateUrl: './show-video.component.html',
  styleUrls: ['./show-video.component.css']
})
export class ShowVideoComponent implements OnInit {

  constructor(private youtubeService: YoutubeService, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute) { }

  videos = [];
  Url = '';
  iframeUrl;
  trustedDashboardUrl: SafeUrl;

  ngOnInit() {
    this.videos = [];
    this.youtubeService.getTrendingVideos(12).subscribe((data: any) => {
          this.videos = data.items;
      });
  }



  addToList(id, titl, description, image) {
    const link = 'https://www.youtube.com/watch?v=' + id;
    const datas = {
      "videoId": 1,
      "videoLink": id,
      "videoTitle": titl,
      "videoDescription": description,
      "videoImage": image,
    };

    this.youtubeService.savePlaylist(datas);

  }

  goToPlaylist() {
    console.log('going to playlist');
  }

  sendDetail(vide) {
    // this.Url = 'http://www.youtube.com/embed/' + videos.id + '?enablejsapi=1&origin=http://example.com';
    //
    // console.log(this.Url);
    //
    // this.trustedDashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.Url);
    // this.iframeUrl = this.trustedDashboardUrl;

    const videoId = vide.id;

    this.router.navigate(['playVideo', videoId], {relativeTo: this.route});


  }



}
