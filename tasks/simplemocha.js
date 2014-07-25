module.exports = {
    all: {
      src: ['test/**/*.js'],
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'nyan'
      }
    }
}
