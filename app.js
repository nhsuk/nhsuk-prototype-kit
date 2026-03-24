import autoprefixer from 'autoprefixer'
import { sassPlugin } from 'esbuild-sass-plugin'
import NHSPrototypeKit, { config } from 'nhsuk-prototype-kit'
import postcss from 'postcss'

import { sessionDataDefaults } from './app/data/session-data-defaults.js'
import { routes } from './app/routes.js'

const processor = postcss([
  autoprefixer({
    env: 'stylesheets'
  })
])

const prototype = await NHSPrototypeKit.init({
  serviceName: 'Image map',
  buildOptions: {
    entryPoints: [
      'app/views/components/**/*.js',
      'app/stylesheets/application.scss',
      'app/javascripts/application.js'
    ],
    plugins: [
      sassPlugin({
        embedded: true,
        loadPaths: config.modulePaths,
        quietDeps: true,
        sourceMap: true,
        sourceMapIncludeSources: true,
        async transform(css, resolveDir, filePath) {
          const result = await processor.process(css, {
            from: filePath
          })

          return result.css
        }
      })
    ]
  },
  viewsPath: ['app/views/'],
  routes,
  sessionDataDefaults
})

prototype.start()
