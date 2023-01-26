import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';

import { fetchAdminUserToken, fetchToken, fetchUserToken } from '../api';
import { publicKey, env, clientId } from 'src/constants';
import { Card } from 'hydrogen-cards';

@Component({
  selector: 'app-cards',
  templateUrl: 'cards.component.html',
  styleUrls: ['cards.component.scss'],
})
export class CardsComponent implements OnInit {
  card: SafeResourceUrl;
  selectedOption: string;
  defaultValue: string;
  response: string;
  adminAccessToken: string;
  accessToken: string;
  ios: boolean;

  constructor(private domSanitizer: DomSanitizer, private platform: Platform) {}

  ngOnInit() {
    this.defaultValue = 'card_balance';
    fetchUserToken(history.state.username, history.state.password).then(
      (res) => {
        this.accessToken = res;
        fetchToken(this.defaultValue, res).then((response) => {
          this.card = this.domSanitizer.bypassSecurityTrustHtml(
            new Card(
              this.defaultValue.replace('_', '-'),
              response,
              publicKey,
              '',
              clientId,
              env
            ).renderCard()
          );
        });
      }
    );

    fetchAdminUserToken().then((res) => (this.adminAccessToken = res));

    if (this.platform.is('ios')) {
      this.ios = true;
    } else {
      this.ios = false;
    }
  }

  onChange(event) {
    this.selectedOption = event.target.value;

    fetchToken(this.selectedOption, this.accessToken).then((response) => {
      this.card = this.domSanitizer.bypassSecurityTrustHtml(
        new Card(
          this.selectedOption.replace('_', '-'),
          response,
          publicKey,
          '',
          clientId,
          env
        ).renderCard()
      );
    });
  }
}
