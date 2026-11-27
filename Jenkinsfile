pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        SONAR_PROJECT_KEY = 'sqe-final-project'
        ARTIFACT_NAME     = "react-app-${env.BUILD_NUMBER}.tar.gz"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Vitest Tests') {
            steps {
                sh 'npm run test -- --run --coverage'
            }
        }

        stage('Code Quality - Oxlint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('SonarQube Analysis & Quality Gate') {
            when {
                branch 'main'
            }
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'
                    withSonarQubeEnv('SonarQube') {
                        sh """
                            "${scannerHome}/bin/sonar-scanner" \
                              -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                              -Dsonar.sources=src \
                              -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
                        """
                    }
                }
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Production Build') {
            when {
                anyOf {
                    branch 'develop'
                    branch 'main'
                }
            }
            steps {
                sh 'npm run build'
            }
        }

        stage('Package & Archive Artifact') {
            when {
                branch 'main'
            }
            steps {
                sh """
                    tar --exclude='node_modules' \
                        --exclude='.git' \
                        --exclude='coverage' \
                        -czf ${ARTIFACT_NAME} dist Dockerfile
                """
                archiveArtifacts artifacts: "${ARTIFACT_NAME}", fingerprint: true
            }
        }
    }

    post {
        success {
            echo "SQE Finals CI Pipeline completed successfully on '${env.BRANCH_NAME}' (#${env.BUILD_NUMBER})!"
        }
        failure {
            echo "SQE Finals CI Pipeline failed on '${env.BRANCH_NAME}' (#${env.BUILD_NUMBER})."
        }
    }
}