import { Component } from "@angular/core";
import { FirebaseService } from "../firebase.service";
import * as $ from "jquery";
import { TestBed } from "../../../node_modules/@angular/core/testing";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  words: any;
  allWords: any;
  options: any;

  score: Number;
  aleatory: Number;

  seconds: Number;
  interval: any;

  constructor(public firebaseService: FirebaseService, private router: Router) {
    this.score = 0;
    this.words = [];
    this.allWords = [];

    this.options = [];

    let ale = this.aleatory;
    let other;

    while (this.aleatory === ale) {
      this.aleatory = this.getAleatory(this.words);
    }

    other = this.getAleatory(this.words);

    this.firebaseService.getAll().then(data => {
      this.test(data);
    });

    this.firebaseService.getScore().then(score => {
      console.log(score);
      this.score = score;
    });
  }
  test(data) {
    this.words = data;
  }
  ionViewDidEnter() {
    this.initInterval();
    if (!this.firebaseService.getUser()) {
      this.router.navigate(["/login"]);
    }
  }
  ionViewWillLeave() {
    clearInterval(this.interval);
  }

  getAleatory(values) {
    return Math.floor(Math.random() * Object.keys(values).length);
  }

  initInterval() {
    this.seconds = 5;
    let that = this;
    this.interval = setInterval(function() {
      that.seconds = that.seconds.valueOf() - 1;

      if (that.seconds.valueOf() == 0) {
        that.setAleatory();
        that.resetInterval();
      }
    }, 1000);
  }

  resetInterval() {
    clearInterval(this.interval);
    this.initInterval();
  }

  selectOption(option) {
    if (option == this.words[this.aleatory.valueOf()]) {
      this.score = this.score.valueOf() + 1;
      this.firebaseService.setScore(this.score);
      this.setAleatory();
    }
    this.resetInterval();
  }
  setAleatory() {
    this.aleatory = Math.floor(Math.random() * Object.keys(this.words).length);
  }
  getNivel() {
    if (this.score < 10) {
      return 1;
    }
    if (this.score < 25) {
      return 2;
    }
    if (this.score < 50) {
      return 3;
    }
    if (this.score < 100) {
      return 4;
    }
    if (this.score < 500) {
      return 5;
    }
  }
}
