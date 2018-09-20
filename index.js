const ejs = require('ejs');
const fs = require('fs');
const async = require('async');

const egVersion = process.env.CIRCLE_TAG.substr(1); // GitHub Tags is vx.y.z — we need just x.y.z
const chartVersion = process.env.EG_CHART_VERSION;

async.parallel([
  cb => ejs.renderFile('./Dockerfile_template', { egVersion }, {}, cb),
  cb => ejs.renderFile('./Helmfile_template', { egVersion, chartVersion }, {}, cb),
  cb => ejs.renderFile('./Helmvaluefile_template', { egDockerVersion: process.env.CIRCLE_TAG }, {}, cb),
  cb => ejs.renderFile('./Helmreadme_template', { egVersion }, {}, cb)
], (err, [Dockerfile, Helmfile, Helmvaluefile, Helmreadme]) => {
  if (err)
    return console.error(err);

  async.parallel([
    cb => fs.writeFile('./alpine/Dockerfile', Dockerfile, cb),
    cb => fs.writeFile('./Helmfile', Helmfile, cb),
    cb => fs.writeFile('./Helmvaluefile', Helmvaluefile, cb),
    cb => fs.writeFile('./Helmreadme', Helmreadme, cb),
  ], err => {
    if (err)
      return console.error(err);
  });
});
