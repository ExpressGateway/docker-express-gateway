const ejs = require('ejs');
const fs = require('fs');
const git = require('isomorphic-git');

const egVersion = process.env.CIRCLE_TAG.substr(1); // GitHub Tags is vx.y.z — we need just x.y.z
const token = process.env.GITHUB_TOKEN;

ejs.renderFile('./Dockerfile_template', { egVersion }, {}, (err, str) => {
  if (err)
    return console.error(err);

  fs.writeFileSync('./alpine/Dockerfile', str);

  const repo = { fs, dir: '.' }

  git.branch({ ...repo, ref: 'feat/update' })
    .then(() => git.checkout({ ...repo, ref: 'feat/update' }))
    .then(() => git.add({ ...repo, filepath: './alpine/Dockerfile' }))
    .then(() => git.commit({ ...repo, message: 'Update', author: { name: 'Vincenzo Chianese', email: 'vincenz.chianese@icloud.com' } }))
    .then(sha => Promise.all([sha, git.push({ ...repo, remote: 'origin', ref: 'feat/update', token, force: true })]))
    .then(console.log)
    .catch(console.error)
})
