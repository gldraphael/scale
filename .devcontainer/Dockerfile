ARG UV_VERSION=latest
ARG DEBIAN_VERSION=bookworm


FROM ghcr.io/astral-sh/uv:$UV_VERSION AS uv


FROM mcr.microsoft.com/vscode/devcontainers/rust:$DEBIAN_VERSION

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        # For OpenCV etc...
        libgl1 libglib2.0-0 \
        # For protobuf
        protobuf-compiler \
        # nodejs dependencies
        curl gnupg \
    # To remove the image size, it is recommended refresh the package cache as follows
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*


# Install Node
RUN curl -sL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install nodejs -y \
    && corepack enable pnpm

COPY --from=uv --chown=vscode: /uv /uvx /bin/
