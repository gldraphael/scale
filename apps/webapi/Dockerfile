# Stage 1: Build
FROM rust:slim-bookworm AS builder

RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    curl \
    protobuf-compiler \
    && rm -rf /var/lib/apt/lists/*

# User definition: only the 'nobody' user
WORKDIR /users
RUN cat /etc/passwd | grep nobody > passwd.nobody

WORKDIR /app
# COPY ./.cargo ./.cargo
COPY ./webapi/Cargo.toml ./webapi/Cargo.lock ./webapi/build.rs ./
COPY ./messages /messages
COPY ./webapi/settings.yaml ./
COPY ./webapi/src ./src
ENV RUSTFLAGS="-C target-feature=+crt-static"
RUN cargo build --release --target "x86_64-unknown-linux-gnu" 

# Stage 2: Final
FROM scratch AS final

LABEL org.opencontainers.image.source="https://github.com/gldraphael/scale"
LABEL org.opencontainers.image.description="API for an ML weight classifier."

EXPOSE 8080

COPY --from=builder /users/passwd.nobody /etc/passwd
USER nobody

WORKDIR /app
COPY --from=builder /app/settings.yaml ./
COPY --from=builder /app/target/x86_64-unknown-linux-gnu/release/scaleapi /app/scaleapi

ENTRYPOINT ["./scaleapi"]
