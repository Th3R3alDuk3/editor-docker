FROM alpine:latest
RUN cd /tmp \
&& apk update \
&& apk upgrade \
&& apk add gcc make musl-dev \
&& wget http://mirror.netcologne.de/savannah/tinycc/tcc-0.9.27.tar.bz2 \
&& tar -xf tcc-0.9.27.tar.bz2 \
&& cd tcc-0.9.27 \
&& ./configure --config-musl \
&& make \
&& make install \