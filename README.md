# scale

`scale` is an experimental classifier designed to predict obesity levels using a range of metrics beyond just height and weight.

My goal with the project was to get some open-source applied ML code out there, particularly since most of my professional work is typically done behind closed doors. I hope this repo also serves as a reference others!  

## Demo

The demo is hosted here: https://scale.galdin.dev   
The demo API is hosted here: https://scale-api.galdin.dev

Note that the hosted scale API has been heavily rate-limited since it is currently running on my personal cluster.

## Quickstart (local)

**Pre-requisites:** Docker Desktop

```sh
docker compose build
docker compose up

# App: http://localhost:8888
# API: http://localhost:8808
```

## Dev Containers setup (local development)

**Pre-requisites:** Docker Desktop, VS Code, VS Code Dev Containers Extension

A development container is a pre-configured development environment running within a docker container. It has everything you need to get started with a project, and you won't have to install any dependencies such as python, or rust, etc. 

To open a project in a development environment, open one of the project folders in VS Code, press <kbd>Ctrl+Shift+P</kbd> to open the command palette, and run the "Reopen in Container" command. The project folders are as follows:

```sh
./notebooks
./apps/pyworker
./apps/webapi
./apps/reactapp
```


## Dataset

This project is based on the following dataset:

* Estimation of Obesity Levels Based On Eating Habits and Physical Condition  [Dataset]. (2019). UCI Machine Learning Repository. https://doi.org/10.24432/C5H31Z.



## License

This project is licensed under a GNU Affero General Public License (AGPL) v3.0.   
See the [LICENSE](./LICENSE) file for more details.

I picked AGPL largely because I do not see anyone needing to use this project outside of an open-source context. However, if you'd like this project under a more permissive license, please open an issue explaining your use-case.

The dataset, originally published by Fabio Mendoza Palechor and Alexis De la Hoz Manotas, is redistributed under a  [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/legalcode) (CC BY 4.0) license.
