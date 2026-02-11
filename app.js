import NHSPrototypeKit from 'nhsuk-prototype-kit'

import { routes } from './app/routes.js'

const prototype = await NHSPrototypeKit.init({
  serviceName: 'Image map',
  buildOptions: {
    entryPoints: ['app/stylesheets/main.scss', 'app/javascripts/*.js']
  },
  viewsPath: ['app/views/'],
  routes
})

prototype.start()
