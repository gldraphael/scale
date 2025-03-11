ARG IMAGE_TAG=latest

FROM mcr.microsoft.com/devcontainers/rust:$IMAGE_TAG

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    # For protobuf
    protobuf-compiler \
    # To remove the image size, it is recommended refresh the package cache as follows
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
