import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Force rebuild trigger
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
