import { Component } from "@angular/core";
import { FirebaseService } from "../firebase.service";

@Component({
  selector: "app-contact",
  templateUrl: "contact.page.html",
  styleUrls: ["contact.page.scss"]
})
export class ContactPage {
  user: any;
  score: any;

  constructor(public firebaseService: FirebaseService) {}

  ngOnInit() {
    this.user = this.firebaseService.getUser();
    this.firebaseService.getScore().then(score => {
      this.score = score;
    });
  }
}
