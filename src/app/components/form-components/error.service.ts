import { Injectable } from '@angular/core';
import { IFormControlConfigurations } from '../../interfaces/form.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
   __config!: IFormControlConfigurations; // need config passed in
  err: string | null = '' ;

  set config(val: IFormControlConfigurations) {
    this.__config = val
  }
  get config() {
    return this.__config;
  }

  constructor() { }
}
