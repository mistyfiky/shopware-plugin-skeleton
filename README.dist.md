# {$description}

## Development

optional: setup direnv

```shell
php -r 'echo phpversion();' >.php-version
node --version >.node-version
cat <<eot >.envrc
export DATABASE_URL=mysql://root:root@127.0.0.1/shopware
use php
use node
eot
direnv allow
```

install dependencies

```shell
composer install
```

optional: duck-tape unfixed issues

```shell
# https://github.com/shopware/shopware/pull/11184
yq -n '{"services":{"database":{"ports":["3306:3306"]}}}' >compose.override.yaml
# https://github.com/shopware/shopware/pull/6920
sed 's/ini name="error_reporting" value="-1"/ini name="error_reporting" value="E_ALL \&amp; ~E_DEPRECATED"/' phpunit.xml.dist >phpunit.xml
```

prepare a test database

```shell
docker compose up --wait database
export DATABASE_URL=mysql://root:root@127.0.0.1/shopware
composer platform init:db
composer platform init:testdb
```

run checks

```shell
composer pre-commit
```
