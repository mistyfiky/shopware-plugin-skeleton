# Mistyfiky's Shopware plugin skeleton

## Usage

```shell
set -e

read -e -p 'What is the desired plugin path? ' -i 'custom/plugins/MistyExample' -r path

# create plugin from skeleton
composer create-project --repository '{"type":"vcs","url":"https://github.com/mistyfiky/shopware-plugin-skeleton"}' mistyfiky/shopware-plugin-skeleton:@dev "${path}"
cd "${path}"

# initialize git inside plugin
git init && git add . && git commit -m "Initial commit"

# open plugin in favourite ide
phpstorm .
```
