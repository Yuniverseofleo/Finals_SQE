
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

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'

                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'SQE Finals CI Pipeline completed successfully!'
        }

        failure {
            echo 'SQE Finals CI Pipeline failed. Check the console output.'
        }
    }
}
