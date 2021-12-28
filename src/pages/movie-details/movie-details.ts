import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TmdbProvider } from '../../providers/tmdb/tmdb';

/**
 * Generated class for the MovieDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-details',
  templateUrl: 'movie-details.html',
  providers: [TmdbProvider]
})
export class MovieDetailsPage {

  public movie
  public movieId
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public provider: TmdbProvider
    ) {
  }

  ionViewDidEnter() {
    
    this.movieId = this.navParams.get('id')
    // console.log(this.movieId)
    this.provider
      .getAPIMethod(`/movie/${this.movieId}`,[['language','en-US']])
      .subscribe(
        data => {
          // console.log(data)
          this.movie = (data as any)
        },
        error => {
          console.log(error)
        }
      )
  }

}
