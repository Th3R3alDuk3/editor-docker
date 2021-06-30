# editor-server-side
  
This is an online **C-editor** that uses **server-side compreters**.  
  
![editor-server-side](preview.gif "editor-server-side")

I used some great techniques and frameworks such as *WebSockets*, [Dockerode](https://www.npmjs.com/package/dockerode) and [Monaco](https://microsoft.github.io/monaco-editor/) in this project. 
Feel free to customize the interpreters or programming languages that have been used.

## installation

Install the following javascript runtime and container virtualization tool.
- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/products/docker-desktop)
  
Download all required dependencies and start *Node.js*.
  
```
npm install
npm start
```
  
---
  
## manual configuration of a container

Install [Docker](https://docs.docker.com/get-docker) and customize the configuration file `docker/Dockerfile`.

```
docker build -t ubuntu - < docker/Dockerfile
docker run ubuntu tcc -v
```

Upload your tagged image to [docker hub](https://hub.docker.com/).

```
docker login -u <username>

docker tag ubuntu:latest <username>/ubuntu:latest
docker push <username>/ubuntu:latest
```

## manual installation of tinycc

At first you need to download [tcc](https://bellard.org/tcc/). Use the latest version [0.9.27](http://download.savannah.gnu.org/releases/tinycc/tcc-0.9.27.tar.bz2).

```
wget http://download.savannah.gnu.org/releases/tinycc/tcc-0.9.27.tar.bz2
tar -xjf tcc-0.9.27.tar.bz2

cd tcc-0.9.27

./configure

make 
make test
make install

tcc -v
```

Now you should test the C-interpreter.

```c
tcc -run -
#include <stdio.h>
void main() {
printf("Hello world!");
}
```

Press `Ctrl-D` ...