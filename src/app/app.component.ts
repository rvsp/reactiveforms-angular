import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { stringify } from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'reactiveForms';
  myForm: FormGroup;
  countries = {
    IND: {
      code: 'IND',
      name: 'India',
      states: {
        TN: {
          code: 'TN',
          name: 'Tamil Nadu',
          cities: [
            {
              code: 'MDU',
              name: 'Madurai',
            },
            {
              code: 'CHN',
              name: 'Chennai',
            },
          ],
        },
        KL: {
          code: 'KL',
          name: 'kerala',
          cities: [
            {
              code: 'WND',
              name: 'Wayanad',
            },
            {
              code: 'KCH',
              name: 'Kochin',
            },
          ],
        },
      },
    },
    DB: {
      code: 'DB',
      name: 'Dubai',
      states: {
        DM: {
          code: 'DM',
          name: 'Dubai Main Road',
          cities: [
            {
              code: 'VK',
              name: 'Vivekandar theru',
            },
          ],
        },
        DK: {
          code: 'DK',
          name: 'Dubai kuruku theru',
          cities: [
            {
              code: 'BS',
              name: 'City 1',
            },
          ],
        },
      },
    },
  };
  countryList = [];
  stateList = [];
  cityList = [];
  i: string;
  constructor(private fb: FormBuilder) {
    this.countryList = Object.keys(this.countries);
    this.myForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required),
      confirm_password: this.fb.control('', Validators.required),
      address: this.fb.array([this.fb.group({
        country: this.fb.control('', Validators.required),
        state: this.fb.control('', Validators.required),
        city: this.fb.control('', Validators.required),
        addressLine1: this.fb.control('', Validators.required),
        addressLine2: this.fb.control('', Validators.required),
        zipCode: this.fb.control('', Validators.required)
      })]),
      gender: this.fb.control('', Validators.required),
      marital_status: this.fb.control('', Validators.required),
      favFood: this.fb.control('', Validators.required),
      favColor: this.fb.control('', Validators.required),

    });
    // console.log(this.myForm.get('address').get('0'))
    for (let i in this.myForm.get('address').value) {
      this.myForm.get('address').get(i).get('country').valueChanges.subscribe((data) => {
        this.stateList[i] = Object.keys(this.countries[data].states).map((item) => {
          return this.countries[data].states[item];
        });
      });
    }
    for (let i in this.myForm.get('address').value) {
      // console.log( this.myForm.get('address').get(i).get('state'))
      this.myForm.get('address').get(i).get('state').valueChanges.subscribe((data) => {
        this.cityList[i] = this.countries[this.myForm.get('address').get(i).get('country').value][
          'states'
        ][data]['cities'];
        // console.log(this.cityList);
      });
    }

  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      alert('Form Submitted successfully');
    } else {
      alert('Fill the form properly and try re submitting');
    }
  }
}