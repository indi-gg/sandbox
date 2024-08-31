pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    def imageName = 'latestimg'
                    def dockerfile = 'Dockerfile' // Replace with the path to your Dockerfile if it's not in the root directory

                    // Build the Docker image
                    sh """
                        docker build -t ${imageName} -f ${dockerfile} .
                    """
                }
            }
        }
    }

    post {
        always {
            // Clean up workspace
            cleanWs()
        }
    }
}
