# {$description}

## Development

optional: setup direnv

```shell
php -r 'echo phpversion();' >.php-version
node --version >.node-version
cat <<eot >.envrc
export APP_URL=http://localhost:8000
export DATABASE_URL=mysql://root:root@127.0.0.1/shopware
use php
use node
eot
direnv allow
```

install php dependencies

```shell
composer install
```

optional: duck-tape unfixed issues

```shell
touch compose.override.yaml
# https://github.com/shopware/shopware/pull/11184
yq -i '.services.database.ports=["3306:3306"]' compose.override.yaml
# speed up migrations
DB_CMD=$(yq '.services.database.command' vendor/shopware/platform/compose.yaml) yq -i '.services.database.command=env(DB_CMD)+["--innodb_file_per_table=0"]' compose.override.yaml
# https://github.com/shopware/shopware/pull/6920
sed 's/ini name="error_reporting" value="-1"/ini name="error_reporting" value="E_ALL \&amp; ~E_DEPRECATED"/' phpunit.xml.dist >phpunit.xml
```

initialize platform

```shell
composer init:platform
```

prepare a test database

```shell
docker compose up --wait database
export DATABASE_URL=${DATABASE_URL:-mysql://root:root@127.0.0.1/shopware}
composer init:testdb
```

install js dependencies

```shell
composer init:js
```

run checks

```shell
composer checks
```

prepare a database

```shell
composer init:db
```

build js

```shell
composer platform build:js
```
