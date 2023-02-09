/**
 * Update build version
 * and write it to version.json
 */

 const fs = require('fs')
 const packageJSON = require('../package.json')
 
 const fileName = __dirname + '/../src/version.json'
 const formats = {
   sha: '%h',
   date: '%cd',
   author: '%an',
   committer: '%cn',
   commit: '%s'
 }
 const build = Object.keys(formats).reduce((acc, key) => {
   acc[key] = require('child_process')
     .execSync(`git log -1 --format="${formats[key]}"`)
     .toString()
     .trim()
   return acc
 }, {})
 const data = {
   app: {
     name: packageJSON.name,
     version: packageJSON.version
   },
   build
 }
 const output = JSON.stringify(data, null, 2)
 console.info('Server info has been updated', output)
 
 fs.writeFileSync(fileName, output)
 