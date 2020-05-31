#!groovy
@Library('ci-scripts') _

pipeline {
  agent {
    dockerfile { filename 'Dockerfile.ci' }
  }

  stages {
    stage('Deploy') {
      when {
        expression { env.BRANCH_NAME in ['master'] }
      }

      steps {
        // package.json should not have private dependencies
        // we should be able to install dependencies without credentials
        sh 'yarn'

        withCredentials([string(credentialsId: 'npm-bringg', variable: 'NPM_TOKEN')]) {
          publishNpm(token: env.NPM_TOKEN, public: true)
        }
      }
    }
  }
}