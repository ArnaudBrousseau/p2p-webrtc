module.exports = {
  all: {
    src: ['test/**/*.js'],
    options: {
      timeout: 3000,
      ignoreLeaks: false,
      ui: 'bdd',
      reporter: 'nyan'
    }
  }
}
