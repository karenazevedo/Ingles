import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "Firebase";
import { AlertController } from "@ionic/angular";
import { FirebaseService } from "../firebase.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"]
})
export class AuthPage implements OnInit {
  constructor(
    private router: Router,
    public alertController: AlertController,
    public firebaseService: FirebaseService
  ) {}

  async presentAlert(error) {
    const alert = await this.alertController.create({
      header: "Alert",
      subHeader: "Error",
      message: error,
      buttons: ["OK"]
    });

    await alert.present();
  }

  isSignup: false;

  ngOnInit() {}

  login(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response);
        this.firebaseService.setUser(response.user);
        this.router.navigate([""]);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  signup(email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response);
        this.firebaseService.setUser(response.user);
        this.router.navigate([""]);
      })
      .catch(function(error) {
        console.log(error);
        this.presentAlert(error.message);
      });
  }
}
