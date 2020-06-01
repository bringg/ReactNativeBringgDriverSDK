#!groovy
@Library('ci-scripts') _

pipeline {
  agent any

  stages {
    stage('Deploy') {
      when {
        expression { env.BRANCH_NAME in ['master'] }
      }

      steps {
        // package.json should not have private dependencies
        // we should be able to install dependencies without credentials
        sh 'npm install'

        withCredentials([string(credentialsId: 'npm-bringg', variable: 'NPM_TOKEN')]) {
          publishNpm(token: env.NPM_TOKEN, public: true)
        }
      }
    }
  }
}