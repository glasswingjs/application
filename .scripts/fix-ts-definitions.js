const fs = require('fs')

fs.readFile(`${process.cwd()}/dist/index.d.ts`, (error, data) => {
  if (error) {
    console.error(`Could not fix types file: ${data}`)
    process.exit(1)
  }

  fs.writeFile(
    `${process.cwd()}/dist/index.d.ts`,
    data
      .toString('utf-8')
      .replace(/import.*http'/, "import * as http from 'http'")
      .replace(/import.*https'/, "import * as https from 'https'")
      .replace(/import.*http2'/, "import * as http2 from 'http2'"),
    (error) => {
      if (error) {
        console.error(`Could not fix types file: ${data}`)
        process.exit(1)
      }
    }
  )
})
