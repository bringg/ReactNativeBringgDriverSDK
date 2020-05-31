// All non-runtime dependencies installed in Dockerfile.ci
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
        withCredentials([string(credentialsId: 'npm-bringg', variable: 'NPM_TOKEN')]) { writeFile file: '.npmrc', text: "//registry.npmjs.org/:_authToken=${env.NPM_TOKEN}" }
        sh 'yarn'
        sh 'npm publish --access public'
      }
    }
  }
}