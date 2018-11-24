import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import * as firebase from "firebase";
import firestore from "firebase/firestore";

const settings = { timestampsInSnapshots: true };

var firebaseConfig = {
  apiKey: "AIzaSyDo8bg7BH0Rj2Y-YrB3F1ZaZOIGM59zkE8",
  authDomain: "igo-app-eda23.firebaseapp.com",
  databaseURL: "https://igo-app-eda23.firebaseio.com",
  projectId: "igo-app-eda23",
  storageBucket: "igo-app-eda23.appspot.com",
  messagingSenderId: "230101145555"
};

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(firebaseConfig);
    firebase.firestore().settings(settings);
  }
}
