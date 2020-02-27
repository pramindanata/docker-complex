# Docker Complex

Learn how to deploy complex app with Docker.

[![Build Status](https://travis-ci.org/pramindanata/docker-complex.svg?branch=master)](https://travis-ci.org/pramindanata/docker-complex)

## How

1. Make sure you have user `travis` on your server.
2. Create SSH key by using `travis` user.
3. Follow this [tutorial](https://github.com/dwyl/learn-travis/blob/master/encrypted-ssh-keys-deployment.md.) to integrate your SSH key with travis deploy key.
4. Make sure you change `encrypted_326343ebfff0_key` and `encrypted_326343ebfff0_iv` from `travis.yml` with your generated one.
5. And set this env values on your Travis CI:
    - `APP_PATH` (transfer location)
    - `CI` (set it to `true`)
    - `DOCKER_ID` (your Docker ID)
    - `DOCKER_PASSWORD` (your Docker pw)
    - `SERVER_IP` (your server IP)
