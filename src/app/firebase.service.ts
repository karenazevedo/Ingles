import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as firebase from "Firebase";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  words: any[];
  user: any;

  ref = firebase.firestore().collection("word");
  database = firebase.database();
  refUser = firebase.firestore().collection("user");

  constructor() {
    this.ref = firebase.firestore().collection("word");
    this.refUser = firebase.firestore().collection("user");
    // this.ref.doc().set({
    //   name: "ball",
    //   translation: "bola",
    //   image:
    //     "https://i0.wp.com/sterlingathletics.com/wp-content/uploads/2015/10/Traditional-Hand-Sewn-Soccer-Ball.png"
    // });
  }

  getAll = () => {
    return new Promise(resolve => {
      let words = [];
      this.ref.get().then(snap => {
        snap.forEach(doc => {
          let data = doc.data();
          words.push({
            name: data.name,
            image: data.image,
            translation: data.translation
          });
        });
      });
      resolve(words);
    });
  };

  getAllTest(): Observable<any> {
    return new Observable(observer => {
      this.ref.onSnapshot(querySnapshot => {
        let words = [];
        querySnapshot.forEach(doc => {
          let data = doc.data();
          words.push({
            name: data.name,
            image: data.image,
            translation: data.translation
          });
        });
        observer.next(words);
      });
    });
  }

  setScore = score => {
    this.refUser.doc(this.user.uid).set(
      {
        email: this.user.email,
        score: score
      },
      { merge: true }
    );
  };

  async getScore() {
    // let res;
    // this.refUser
    //   .where("email", "==", this.user.email)
    //   .get()
    //   .then(result => {
    //     console.log(result);
    //     res = result.docs;
    //   });

    // return res;
    let res;
    await this.refUser
      .doc(this.user.uid)
      .get()
      .then(function(doc) {
        console.log("Document data:", doc.data());
        if (doc.exists) {
          console.log("Document data:", doc.data());
          res = doc.data();
        } else {
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
    return res.score;
  }

  setUser(user) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }
}
