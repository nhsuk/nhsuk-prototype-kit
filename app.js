import NHSPrototypeKit from 'nhsuk-prototype-kit'

const prototype = await NHSPrototypeKit.init({
  serviceName: 'Image map',
  buildOptions: {
    entryPoints: ['app/stylesheets/main.scss', 'app/javascripts/*.js']
  },
  viewsPath: ['app/views/']
})

prototype.start()
