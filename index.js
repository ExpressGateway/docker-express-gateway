const ejs = require('ejs');
const fs = require('fs');
const async = require('async');

const egVersion = process.env.CIRCLE_TAG.substr(1); // GitHub Tags is vx.y.z — we need just x.y.z

async.parallel([
  (cb) => ejs.renderFile('./Dockerfile_template', { egVersion }, {}, cb),
  (cb) => ejs.renderFile('./Helmfile_template', { egVersion, chartVersion: egVersion }, {}, cb)
], (err, [Dockerfile, Helmfile]) => {
  if (err)
    return console.error(err);

  fs.writeFileSync('./alpine/Dockerfile', Dockerfile);
  fs.writeFileSync('./Helmfile', Helmfile);
});

