workflow "On Push - Deploy to Github Pages" {
  on = "push"
  resolves = ["On Push - Deploy to branch 'gh-pages'"]
}

action "On Push - master branch only" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "On Push - Deploy to branch 'gh-pages'" {
  uses = "JamesIves/github-pages-deploy-action@master"
  env = {
    BRANCH = "gh-pages"
    BUILD_SCRIPT = "npm install && npm run-script build"
    FOLDER = "build"
  }
  secrets = ["ACCESS_TOKEN"]
  needs = ["On Push - master branch only"]
}

workflow "Scheduled - Deploy to Github Pages" {
  resolves = ["Scheduled - Deploy to branch 'gh-pages'"]
  on = "schedule(0 */3 * * *)"
}

action "Scheduled - master branch only" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Scheduled - Deploy to branch 'gh-pages'" {
  uses = "JamesIves/github-pages-deploy-action@master"
  env = {
    BRANCH = "gh-pages"
    BUILD_SCRIPT = "npm install && npm run-script build"
    FOLDER = "build"
  }
  secrets = ["ACCESS_TOKEN"]
  needs = ["Scheduled - master branch only"]
}
