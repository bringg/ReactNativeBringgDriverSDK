#!groovy
@Library('ci-scripts') _

pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        // package.json should not have private dependencies
        // we should be able to install dependencies without credentials
        docker.image('node:12-alpine').inside() {
          sh "npm install"
        }
      }
    }

    stage('Deploy') {
      when {
        expression { env.BRANCH_NAME in ['master'] }
      }

      steps {
        withCredentials([string(credentialsId: 'npm-bringg', variable: 'NPM_TOKEN')]) {
          publishNpm(token: env.NPM_TOKEN, public: true)
        }
      }
    }
  }
}