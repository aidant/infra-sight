import Camo from 'camo';

import settings from '../config/env';

export default {
  connect() {
    console.log(`Connecting to database '${settings.databaseUri}'`);

    return Camo.connect(settings.databaseUri);
  }
};
