'use strict'

const fs = require('fs')
const path = require('path')

export const loadFixture = filename => fs.readFileSync(path.join(__dirname, filename), 'utf8')
