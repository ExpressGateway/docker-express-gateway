const ejs = require('ejs');
const fs = require('fs');
const git = require('isomorphic-git');

const egVersion = process.env.CIRCLE_TAG.substr(1); // GitHub Tags is vx.y.z — we need just x.y.z
const token = process.env.GITHUB_TOKEN;
const name = process.env.GITHUB_NAME;
const email = process.env.GITHUB_EMAIL;
const repo = { fs, dir: '.' }

git.branch({ ...repo, ref: `feat/update_${egVersion}` })
  .then(() => git.checkout({ ...repo, ref: `feat/update_${egVersion}` }))
  .then(() => new Promise((resolve, reject) => {
    ejs.renderFile('./Dockerfile_template', { egVersion }, {}, (err, str) => {
      if (err)
        return reject(err);

      fs.writeFileSync('./alpine/Dockerfile', str);

      return git.add({ ...repo, filepath: './alpine/Dockerfile' }).then(resolve).catch(reject);
    })
  }))
  .then(() => {
    return git.commit({ ...repo, message: 'Update', author: { name, email } })
  })
  .then(sha => Promise.all([sha, git.push({ ...repo, remote: 'origin', ref: `feat/update_${egVersion}`, token, force: true })]))
  .then(console.log)
  .catch(console.error)
