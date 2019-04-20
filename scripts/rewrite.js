/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

"use strict";

const fs = require("fs");

fs.readdirSync("./__tests__")
  .filter(f => /\.js$/.test(f))
  .forEach(f => {
    const name = `./__tests__/${f}`;
    const content = fs.readFileSync(name).toString();
    fs.writeFileSync(name, content.replace(/\.\.\/\.\.\/dist/g, "../dist"));
  });
