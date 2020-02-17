const isCoverageEnabled = !!(process.env.NYC_PARENT_PID || process.env.NYC_PROCESS_ID)

module.exports = {
  color: true,
  recursive: true,
  require: ['@babel/register', '@babel/polyfill'],
  timeout: 60000,
  reporter: isCoverageEnabled ? 'mocha-multi-reporters' : 'spec'
}
