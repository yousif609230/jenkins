# this file will create a docker container that will be work as remote host and some jenkins joob will be run in

FROM centos

RUN cd /etc/yum.repos.d/
RUN sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
RUN sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*
RUN yum -y install openssh-server
RUN yum install -y passwd
RUN useradd remote_user && \
    echo "1234" | passwd remote_user  --stdin && \
    mkdir /home/remote_user/.ssh && \
    chmod 700 /home/remote_user/.ssh

COPY remote-key.pub /home/remote_user/.ssh/authorized_keys

RUN  ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key && \
     ssh-keygen -t dsa -f /etc/ssh/ssh_host_dsa_key && \
     ssh-keygen -t ecdsa -f /etc/ssh/ssh_host_ecdsa_key && \
     ssh-keygen -t ecdsa -f /etc/ssh/ssh_host_ed25519_key
#RUN chown remote_user:remote_user   -R /home/remote_user && \
#    chmod 600 /home/remote_user/.ssh/authorized_keys
RUN chown remote_user:remote_user   -R /home/remote_user && \
    chmod 600 /home/remote_user/.ssh/authorized_keys && \
    rm /run/nologin
#RUN /usr/sbin/sshd-keygen

CMD /usr/sbin/sshd -D
