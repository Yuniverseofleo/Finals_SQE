
pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Vitest Tests') {
            steps {
                sh 'npm run test -- --run'
            }
        }

        stage('Code Quality - Oxlint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Production Build') {
            steps {
                sh 'npm run build'
            }
        }
    }

    post {
        success {
            echo 'SQE Finals CI Pipeline completed successfully!'
        }

        failure {
            echo 'SQE Finals pipeline failed. Check Console Output.'
        }
    }
}
