pipeline {
    agent any
    stages{
        stage("Prepare") {
            steps {
                script{
                    if(env.GIT_BRANCH == 'origin/master'){
                        env.HOST = env.PROD_HOST
                    }else{
                        env.HOST = env.HOMOLOG_HOST
                    }
                }
            }
        }

        stage("Create artifact"){
            steps {
                script{
                    def artifactFolder = "/var/lib/jenkins/artifacts"
                    def needTargetPath = !fileExists("${artifactFolder}")
                    def fullFileName = "${env.BUILD_TAG}.tar.gz"
                    if (needTargetPath) {
                        sh "mkdir ${artifactFolder}"
                    }
                    def applicationZip = "${artifactFolder}/${fullFileName}"
                    sh "tar -czf ${applicationZip} ."
                }
            }
        }

        stage("Deliver Artifact"){
            steps{
                script{
                    sh "scp -o StrictHostKeyChecking=no /var/lib/jenkins/artifacts/${env.BUILD_TAG}.tar.gz mastertech@${env.HOST}:/home/mastertech/"
                }
            }
        }

        stage("Deploy Artifact on Server"){
            steps{
                script{
                    sh "ssh -t mastertech@${env.HOST} '/home/mastertech/deploy.sh ${env.BUILD_TAG} Nisia'"
                }
            }
        }
    }

    post{
        always {
            cleanWs()
        }
    }
}
