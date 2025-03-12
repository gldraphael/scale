
from dynaconf import Dynaconf

settings = Dynaconf(
    envvar_prefix="SCALE",
    settings_files=['settings.yaml', '.secrets.yaml'],
)

# `envvar_prefix` = export envvars with `export DYNACONF_FOO=bar`.
# `settings_files` = Load these files in the order.
