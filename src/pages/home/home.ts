import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular'
import { NavController } from 'ionic-angular';

import { TmdbProvider } from '../../providers/tmdb/tmdb'
import { MovieDetailsPage } from '../movie-details/movie-details';

// import { SongCardComponent } from '../../components/song-card'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    TmdbProvider
  ]
})
export class HomePage {

  public title = `Madison, WI`
  public text = `Founded in 1829 on an isthmus between Lake Monona and Lake Mendota, Madison was named the capital of the
  Wisconsin Territory in 1836.`

  public moviesList = []
  public loader
  public refresher
  public isRefreshing = false

  constructor(
    public navCtrl: NavController,
    public loadCtrl: LoadingController,
    private provider: TmdbProvider
    ) {
  }

  openDetails(movie){
    this.navCtrl.push(MovieDetailsPage,
      {
        id:movie.id
      })
  }

  doRefresh(refresher) {
    this.refresher = refresher
    this.isRefreshing = true

    this.loadMovies()
  }

  presentLoading() {
    this.loader = this.loadCtrl.create({
      content: "Please wait..."
    })
    this.loader.present()
  }

  closeLoading() {
    this.loader.dismiss()
  }

  ionViewDidEnter() {
    this.loadMovies()
  }

  loadMovies() {
    const closeRefresh = () => {
      this.refresher.complete()
      this.isRefreshing = false
    }

    this.presentLoading()
    this.provider
      .getAPIMethod('/movie/popular',[['page',1],['language','en-US']])
      .subscribe(
        data => {
        let responseArray = (data as any).results
        if(responseArray) this.moviesList = responseArray.sort((a,b)=>a.vote_average-b.vote_average).reverse()
        // console.log(responseArray)
        this.closeLoading()
        if(this.isRefreshing) {
          closeRefresh()
        }
      },
      erro => {
        console.log('erro',erro)
        this.closeLoading()
        if(this.isRefreshing) {
          closeRefresh()
        }
      }
      )
  }

}
