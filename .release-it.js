module.exports = {
  "git": {
    "requireUpstream": false,
    "tagName": "v${version}",
    commitMessage: 'chore: release v${version}'
  },
  // github: {
  //   release: true
  // },
  "hooks": {
    "after:init": [
      "npm run prettier:write",
      "npm run lint",
      "npm test",
      "npm run build"
    ]
  }
}
