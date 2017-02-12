import 'jquery';
import 'bootstrap-sass';
import { Aurelia } from 'aurelia-framework';

import config from 'config/app.config.json!json';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration();

  if (config.debug) {
    aurelia.use.developmentLogging();
  }

  aurelia.start().then(() => aurelia.setRoot());
}