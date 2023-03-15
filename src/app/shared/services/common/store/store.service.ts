import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JWTToken } from 'src/app/shared/core/models/jwtToken';
import { EventBusState } from '../event-bus/event-bus-action';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private tokenHelper = new JwtHelperService();

  constructor() {
  }


  initializeState(): EventBusState {
    const state = localStorage.getItem('state') ?? '';

    try {
      const stateasObj = JSON.parse(state) as EventBusState;
      return stateasObj ? new EventBusState(stateasObj) : new EventBusState();
    } catch (error) {
      return  new EventBusState();
    }
  }

  /**
   * @description set key/value
   */
  public async saveState(currentstate: any) {
    localStorage.setItem('state', JSON.stringify(currentstate));
  }

  /**
   * @description clear all app data from device storage
   */
   public async clearAll() {
    // const state = await this.initializeState();
    // const timeLeft = state.timeLeftTheApp.value;
    // await this.storage?.clear();
    // const newState = await this.initializeState();
    // const oldTimeLeft = timeLeft;
    // newState.timeLeftTheApp.value = oldTimeLeft;
    // await this.saveState(newState);
    localStorage.clear();
  }

  extractToken(token: string): { success: boolean, token: JWTToken } {

    try {
      const convertedToken: JWTToken = this.tokenHelper.decodeToken(token) ?? {} as JWTToken;
      convertedToken.jwt = token;

      return { success: true, token: convertedToken }

    } catch (error) {
      return { success: false, token: {} as JWTToken }
    }
  }
}
