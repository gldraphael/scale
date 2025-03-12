# Stage 1: build
FROM python:3.12-slim-bookworm AS builder

# install protoc
RUN apt-get update && apt-get install -y \
    protobuf-compiler \
    && rm -rf /var/lib/apt/lists/*

# Install uv
COPY --from=ghcr.io/astral-sh/uv:0.6.6 /uv /uvx /bin/

WORKDIR /app

# setup venv with dependencies
COPY ./pyworker/pyproject.toml ./pyworker/uv.lock ./
RUN uv sync --frozen
ENV VIRTUAL_ENV=/app/.venv
ENV PATH="/app/.venv/bin:$PATH"

# generate protobuf server files
COPY ./messages ../messages
COPY ./pyworker/gen.sh .
RUN ./gen.sh

# Copy the rest of the application code & config over
COPY ./pyworker/settings.yaml ./
COPY ./pyworker/src/ src/

# Stage 2: final
FROM python:3.12-slim AS final

EXPOSE 8080

WORKDIR /app
ENV VIRTUAL_ENV=/app/.venv
ENV PATH="/app/.venv/bin:$PATH"

COPY --from=builder /app /app

CMD ["python", "./src/app.py"]
