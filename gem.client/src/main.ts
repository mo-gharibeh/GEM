import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from "./app/AppModule.1";

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
