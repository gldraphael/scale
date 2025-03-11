## pyworker

### Development environment

**Pre-requisites:** VS Code, Docker Desktop, [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

1. Open this folder in VS Code, and reopen the project in a Dev Container. (<kbd>Ctrl + Shift + P</kbd> &rarr; `Dev Containers: Rebuild Container`)
1. Wait for the container to build.
1. Kill all existing VS Code terminal instances and create a new terminal instance. (<kbd>Ctrl + ~</kbd>)
1. Generate grpc code using `./gen.sh`.
1. Run the app with `uv run ./src/app.py`.
