# jenkins

# to pull the jenkins image
1 - docker pull jenkins:2.60.3
# to create 2 directory for jenkins files and the second for the data
2 - mkdir jenkins
3 - cd jenkins
4 - mkdir jenkins_home
# create docker compose file , this file will define all docker network and mount setting
5 - vi docker-compose.yml (copy all content in yml file here)
# change the ownership of the jenkins_home directory to the main admin
6 - sudo chown 1000:1000 jenkins_home -R
#run docker compose file
7- docker compose up -d 

#to find first time password
docker logs -f jenkins(container name defined within yml container_name)
