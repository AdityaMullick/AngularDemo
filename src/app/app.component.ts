import { Component } from '@angular/core';
import { Input } from '@angular/core';

export class User {
  country: string;
  position: {lat: number, lng: number};
  name: string;
}

const numUsers = 5;
const names = ['Ana', 'Neal', 'Rachel', 'Sarah', 'Tyler', 'Andrew', 'Harry'];
const countries = ['Greece', 'Italy', 'Spain', 'US', 'Mexico', 'India'];

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  title = 'Demo';
  lat = 51.678418;
  lng = 7.809007;
  users = [];
  type;
  data;
  options;
  numIncrements = 0;
  timeInterval = 3;
  tableInfo = {};
  keys;
  values;

  constructor() {
    // create a lot of users
    for (let i = 0; i < numUsers; i++) {
      // create user with random name, position, and country
      var randPerson = Math.floor(Math.random() * names.length);
      var randCountry = Math.floor(Math.random() * countries.length);
      var personName = names[randPerson];
      var countryName = countries[randCountry];
      var randLat = (Math.random() * 100) - 50;
      var randLng = (Math.random() * 100) - 50;
      var user: User = {
        country: countryName,
        position: {
          lat: randLat,
          lng: randLng
        },
        name: personName
      };
      this.users.push(user);
      // generate random position

    }
    this.createChart();
    this.createTable();
    var key;
    var value;

    setInterval(() => {
      this.update();
    }, 1000);

  }

  update() {
    var randVal = Math.random();


    // deletes
    if (randVal < 0.33 && this.users.length  > 0) {
      this.removeVisitor();

    } else if (randVal < .66) {
      this.addVisitor();

    } else {
      this.mutateVisitor();

    }
    this.updateChart();
  }
  addVisitor() {
    var randPerson = Math.floor(Math.random() * names.length);
    var randCountry = Math.floor(Math.random() * countries.length);
    var personName = names[randPerson];
    var countryName = countries[randCountry];
    var randLat = (Math.random() * 100) - 50;
    var randLng = (Math.random() * 100) - 50;
    var user: User = {
      country: countryName,
      position: {
        lat: randLat,
        lng: randLng
      },
      name: personName
    };
    this.users.push(user);
    if (typeof(this.tableInfo[countryName]) === 'undefined') {
      console.log(countryName);
      this.tableInfo[countryName] = 1;
      this.keys = Object.keys(this.tableInfo);
    } else {
      this.tableInfo[countryName]++;
    }}
  removeVisitor() {
    if (this.users.length === 0) {
      return;
    }



    // generate random index to update
    var randVal = Math.floor(Math.random() * this.users.length);

    var markerLat = Math.round(this.users[randVal].position.lat * 100) / 100;
    var markerLng = Math.round(this.users[randVal].position.lng * 100) / 100;

    this.tableInfo[this.users[randVal].country]--;

    // remove visitor data
    this.users.splice(randVal, 1);

  }
  mutateVisitor() {
    // generate random index to update
    var randValue = Math.floor(Math.random() * this.users.length);
    var visitor = this.users[randValue];

    if (typeof(visitor) === 'undefined') {
      return;
    }

    var formerLat = Math.round(this.users[randValue].position.lat * 100) / 100;
    var formerLng = Math.round(this.users[randValue].position.lng * 100) / 100;




// random latitude and longitude
    var latitude = (Math.random() * 150) - 60;
    var longitude = (Math.random() * 150) + 25;

    var newLat = Math.round(latitude * 100) / 100;
    var newLng = Math.round(longitude * 100) / 100;

// create position variable
    var position = {lat: latitude, lng: longitude};
    visitor.position = position;
  }


  createChart() {
    this.type = 'line';
    this.data = {
      labels: [this.numIncrements],
      datasets: [
        {
          label: 'Users',
          data: [this.users.length]
        }
      ]
    };
    this.options = {
      responsive: true,
      maintainAspectRatio: false
    };
  }
  updateChart() {
    this.numIncrements++;
    var arr = this.data.datasets[0].data;
    arr.push(this.users.length);
    this.data.labels.push(this.numIncrements);
  }
  createTable() {
    for (var i = 0; i < this.users.length; i++) {
      if (typeof(this.tableInfo[this.users[i].country]) === 'undefined') {
        this.tableInfo[this.users[i].country] = 1;
      } else {
        this.tableInfo[this.users[i].country]++;
      }
    }
    this.keys = Object.keys(this.tableInfo);
  }
}
