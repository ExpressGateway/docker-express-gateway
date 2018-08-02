const ejs = require('ejs');
const fs = require('fs');
const git = require('isomorphic-git');

ejs.renderFile('./Dockerfile_template', { egVersion: "1.10.3" }, {}, (err, str) => {
  if (err)
    return console.error(err);

  fs.writeFileSync('./alpine/Dockerfile', str);

  const repo = { fs, dir: '.' }

  git.branch({ ...repo, ref: 'feat/update' })
    .then(() => git.checkout({ ...repo, ref: 'feat/update' }))
    .then(() => git.add({ ...repo, filepath: './alpine/Dockerfile' }))
    .then(() => git.commit({ ...repo, message: 'Nasino pariosino', author: { name: 'EGBot', email: 'info@express-gateway.io' } }))
    .then(() => git.push({ ...repo, remote: 'origin', ref: 'feat/update', }))
    .catch(err => console.error)
})
