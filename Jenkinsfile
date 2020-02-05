pipeline {
    agent any
    parameters {
        string(
            name: "HOMOLOG_HOST",
            defaultValue:"nisia.homolog.mastertech.com.br"
        )
        string(
            name: "PRODUCTION_HOST",
            defaultValue:"nisia.mastertech.com.br"
        )
        string(
            name: "UTILS_PATH",
            defaultValue:"/var/lib/jenkins/utils"
        )
        string(
            name: "APP_NAME",
            defaultValue:"nisia"
        )
        string(
            name: "APP_SERVICE",
            defaultValue:"server"
        )
        string(
            name: "DOCKER_IMAGE",
            defaultValue:"nisia"
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

                            dockerTag = env.BUILD_ID
                            if(gitTag?.trim()) {
                                dockerTag = gitTag
                            }

                            sh "cp ${params.UTILS_PATH}/nginx-gunicorn.conf nginx.conf"
                            sh "cp ${params.UTILS_PATH}/supervisor-nginx-gunicorn.conf supervisord.conf"

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
                    when { not { expression { gitTag?.trim() } } }
                    stages {
                        stage("Pull latest image") {
                            steps {
                                sh "ssh -t mastertech@${params.HOMOLOG_HOST} 'docker-compose " +
                                    "-p ${params.APP_NAME} -f /app/${params.DOCKER_IMAGE}/docker-compose.yml " +
                                    "pull ${params.APP_SERVICE}'"
                            }
                        }
                        stage("Recriate service") {
                            steps {
                                sh "ssh -t mastertech@${params.HOMOLOG_HOST} 'docker-compose " +
                                    "-p ${params.APP_NAME} -f /app/${params.DOCKER_IMAGE}/docker-compose.yml " +
                                    "up --no-deps -d ${params.APP_SERVICE}'"
                            }
                        }
                    }
                }
            }
        }
        stage("Deploy Production") {
            when { buildingTag() }
            stages {
                stage("Pull latest image") {
                    steps {
                        sh "ssh -t mastertech@${params.PRODUCTION_HOST} 'docker-compose " +
                            "-p ${params.APP_NAME} -f /app/${params.DOCKER_IMAGE}/docker-compose.yml " +
                            "pull ${params.APP_SERVICE}'"
                    }
                }
                stage("Recriate service") {
                    steps {
                        sh "ssh -t mastertech@${params.PRODUCTION_HOST} 'docker-compose " +
                            "-p ${params.APP_NAME} -f /app/${params.DOCKER_IMAGE}/docker-compose.yml " +
                            "up --no-deps -d ${params.APP_SERVICE}'"
                    }
                }
            }
        }
    }
}
