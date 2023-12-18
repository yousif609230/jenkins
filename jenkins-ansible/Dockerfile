FROM jenkins/jenkins

USER root

RUN apt update -y && \
    apt install python3-pip -y && \
    pip install ansible --break-system-packages
