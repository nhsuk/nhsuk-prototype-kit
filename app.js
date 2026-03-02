import NHSPrototypeKit from 'nhsuk-prototype-kit'

import { sessionDataDefaults } from './app/data/session-data-defaults.js'
import { routes } from './app/routes.js'

const prototype = await NHSPrototypeKit.init({
  serviceName: 'Image map',
  buildOptions: {
    entryPoints: ['app/stylesheets/main.scss', 'app/javascripts/*.js']
  },
  viewsPath: ['app/views/'],
  routes,
  sessionDataDefaults
})

prototype.start()
