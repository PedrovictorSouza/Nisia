pipeline {
    agent any
    parameters {
        string(
            name: "APP_SERVICE_NAME",
            defaultValue: "nisia"
        )
        string(
            name: "DOCKER_IMAGE",
            defaultValue: "docker.mastertech.com.br/${params.APP_SERVICE_NAME}"
        )
    }
    post {
        always {
            cleanWs()
        }
    }
    stages{
        stage("Install dependencies") {
            steps {
                sh "python3 -m venv venv"
                sh ". venv/bin/activate"
                sh "pip3 install -r requirements.txt"
            }
        }
        stage("Tests") {
            steps {
                script {
                    def postgresPort = sh (
                            script: "awk -v min=64000 -v max=65000 'BEGIN{srand(); print int(min+rand()*(max-min+1))}'",
                            returnStdout: true
                        ).trim()
                    docker.image("postgres:latest").withRun(
                        "-e 'POSTGRES_DB=${params.APP_NAME}' " +
                        "-e 'POSTGRES_USER=${params.APP_NAME}' " +
                        "-e 'POSTGRES_PASSWORD=${params.APP_NAME}' " +
                        "-p $postgresPort:5432") { c ->
                            sh "while ! pg_isready -h localhost -p $postgresPort; do sleep 1; done"
                            withEnv(["NISIA_DB_NAME=${params.APP_NAME}",
                                     "NISIA_DB_USER=${params.APP_NAME}",
                                     "NISIA_DB_PASS=${params.APP_NAME}",
                                     "NISIA_DB_HOST=localhost",
                                     "NISIA_DB_PORT=${postgresPort}",
                                     "NISIA_DEBUG=True"]) {
                                sh "python3 manage.py migrate"
                                sh "python3 manage.py test"
                            }
                        }
                }
            }
        }
        stage("Build and Deploy Staging") {
            when { branch 'master' }
            stages {
                stage("Build and push image") {
                    steps {
                        script {
                            gitTag = sh (
                                script: 'git tag --contains',
                                returnStdout: true
                            ).trim()

                            dockerTag = sh (
                                script: 'git rev-parse --short HEAD',
                                returnStdout: true
                            ).trim()

                            if(gitTag?.trim()) {
                                dockerTag = gitTag
                            }

                            withCredentials([
                            usernamePassword(
                                credentialsId: 'mastertech-docker-registry',
                                passwordVariable: 'PASSWORD',
                                usernameVariable: 'USERNAME')
                            ]) {
                                sh "docker login -p $PASSWORD -u $USERNAME docker.mastertech.com.br"
                            }

                            docker.withRegistry("https://docker.mastertech.com.br",
                            "mastertech-docker-registry") {
                                def newImage = docker.build("${params.DOCKER_IMAGE}",
                                    "--no-cache -t ${params.DOCKER_IMAGE}:$dockerTag .")
                                newImage.push()
                            }
                        }
                    }
                }
                stage("Deploy Staging") {
                    steps {
                        sh "kubectl apply -f deploy/staging.yaml"
                        sh "kubectl rollout restart deploy ${params.APP_SERVICE_NAME} -n staging"
                    }
                }
            }
        }
        stage("Deploy Production") {
            when { buildingTag() }
            steps {
                sh "kubectl apply -f deploy/production.yaml"
                sh "kubectl rollout restart deploy ${params.APP_SERVICE_NAME} -n production"
            }
        }
    }
}
