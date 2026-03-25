# Jenkins Job 1: Build & Deploy Docker Image

This document explains the mechanism of **Job 1** in our Jenkins pipeline, which handles the fetching, building, and pushing of the Playwright Docker image to Docker Hub.

## Pipeline Mechanism

Job 1 is triggered to compile the project code into a containerized environment. It comprises the following stages:

1. **Checkout Code**: Connects to the GitHub repository using provided credentials and pulls the latest source code from the configured branch (`main`).
2. **Build Docker Image**: Uses the `Dockerfile` present in the repository to build an image named after the configured Docker Hub repository (`dasun544/playwright-demo-ci`) and version tag (`v1.0`).
3. **Push to Docker Hub**: Uses a Docker Hub token to authenticate and securely push the newly built image to the central Docker Hub registry.
4. **Post Actions (Cleanup)**: The pipeline forces a cleanup of the local Docker image to prevent space exhaustion and logs the overall status (success/failure) of the job.

## Jenkinsfile (Groovy)

```groovy
pipeline {
    agent any
    
    // Environment variables
    environment {
        DOCKERHUB_REPO = "dasun544/playwright-demo-ci"
        DOCKERHUB_CREDENTIALS_ID = "dockerhub-token"
        GITHUB_CREDENTIALS_ID = 'github-pat-new'
        GITHUB_REPO_URL = 'https://github.com/Dasun169/playwright-demo-CI.git'
        DOCKER_BUILDKIT = '1'
        IMAGE_TAG = 'v1.0'
        GIT_BRANCH = 'main'
    }
    
    stages {
        // Stage 1: Checkout code from GitHub
        stage('Checkout Code') {
            steps {
                script {
                    echo "=============================================="
                    echo "Step 1: Checking out branch '${env.GIT_BRANCH}' from GitHub..."
                    
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: "${env.GIT_BRANCH}"]],
                        userRemoteConfigs: [[
                            url: "${env.GITHUB_REPO_URL}",
                            credentialsId: "${env.GITHUB_CREDENTIALS_ID}"
                        ]]
                    ])
                    
                    echo "Code checkout completed from branch: ${env.GIT_BRANCH}"
                    echo "Directory contents:"
                    bat "dir"
                    echo "=============================================="
                }
            }
        }
        
        // Stage 2: Build Docker image
        stage('Build Docker Image') {
            steps {
                script {
                    echo "=============================================="
                    echo "Step 2: Building Playwright Docker image..."
                    
                    def imageTag = "${env.DOCKERHUB_REPO}:${env.IMAGE_TAG}"
                    echo "Docker image tag: ${imageTag}"
                    
                    // Build the Docker image
                    bat """
                        echo "Building Docker image with Playwright tests..."
                        docker build -t ${imageTag} .
                    """
                    
                    echo "Docker image built successfully."
                    
                    // Optional: Verify the image was created
                    bat "docker images ${imageTag}"
                    
                    echo "=============================================="
                }
            }
        }
        
        // Stage 3: Push Docker image to Docker Hub
        stage('Push to Docker Hub') {
            steps {
                script {
                    echo "=============================================="
                    echo "Step 3: Pushing Docker image to Docker Hub..."
                    
                    def imageTag = "${env.DOCKERHUB_REPO}:${env.IMAGE_TAG}"
                    
                    withCredentials([usernamePassword(
                        credentialsId: env.DOCKERHUB_CREDENTIALS_ID,
                        passwordVariable: 'DOCKERHUB_PASSWORD',
                        usernameVariable: 'DOCKERHUB_USERNAME'
                    )]) {
                        echo "Logging in to Docker Hub with access token..."
                        
                        // Login using access token
                        bat "echo ${DOCKERHUB_PASSWORD} | docker login -u ${DOCKERHUB_USERNAME} --password-stdin"
                        
                        echo "Pushing Docker image: ${imageTag}"
                        bat "docker push ${imageTag}"
                        
                        echo "Logging out from Docker Hub..."
                        bat "docker logout"
                    }
                    
                    echo "Docker image pushed successfully to Docker Hub."
                    echo "=============================================="
                }
            }
        }
    }
    
    post {
        always {
            script {
                echo "=============================================="
                echo "Cleaning up..."
                
                def imageTag = "${env.DOCKERHUB_REPO}:${env.IMAGE_TAG}"
                
                // Clean up Docker images (optional - you might want to keep it)
                bat """
                    echo "Removing Docker image: ${imageTag}"
                    docker rmi -f ${imageTag} 2>nul || echo Image removal failed or image not found
                """
                
                echo "Cleanup completed."
                echo "=============================================="
            }
        }
        
        success {
            echo "=============================================="
            echo "✅ Pipeline completed successfully!"
            echo "✅ Docker image built: ${env.DOCKERHUB_REPO}:${env.IMAGE_TAG}"
            echo "✅ Image pushed to Docker Hub"
            echo "=============================================="
        }
        
        failure {
            echo "=============================================="
            echo "❌ Pipeline failed. Check the console output above for details."
            echo "=============================================="
        }
    }
}
```
