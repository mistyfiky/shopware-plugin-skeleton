<?php

declare(strict_types=1);

function camel2dashed($className): string {
    return strtolower(preg_replace('/([a-zA-Z])(?=[A-Z])/', '$1-', $className));
}

function file_replace(string $filename, array $replacements): void {
    file_put_contents($filename, str_replace(array_keys($replacements), array_values($replacements), file_get_contents($filename)));
}

$pluginFullName = basename(__DIR__);
[$shorthandPrefix, $pluginShortName] = preg_split('/(?=[A-Z])/', $pluginFullName, 2, PREG_SPLIT_NO_EMPTY) + [null, null];
$namespace = sprintf('%s\\%s', $shorthandPrefix, $pluginShortName);

$composerJson = json_decode(file_get_contents('composer.json'), flags: JSON_THROW_ON_ERROR);
$composerJson->name = sprintf('%s/shopware-%s', strtolower($shorthandPrefix), camel2dashed($pluginShortName));
$description = sprintf('%s %s Shopware plugin', $shorthandPrefix, $pluginShortName);
$composerJson->description = $description;
$composerJson->license = 'proprietary';
$composerJson->authors[0]->name = $shorthandPrefix;
$composerJson->extra->{'shopware-plugin-class'} = sprintf('%s\\%s', $namespace, $pluginFullName);
$composerJson->extra->label->{'en-GB'} = $description;
$composerJson->extra->description->{'en-GB'} = $description;
$composerJson->autoload->{'psr-4'} = (object) [sprintf('%s\\', $namespace) => $composerJson->autoload->{'psr-4'}->{'Misty\\Plugin\\'}];
$composerJson->{'autoload-dev'}->{'psr-4'} = (object) [sprintf('%s\\Test\\', $namespace) => $composerJson->{'autoload-dev'}->{'psr-4'}->{'Misty\\Plugin\\Test\\'}];
unset($composerJson->scripts->{'post-root-package-install'});
array_walk_recursive($composerJson->scripts, function(&$script) use ($pluginFullName) {
    $script = str_replace('"$(basename "$(pwd)")"', $pluginFullName, $script);
});
file_put_contents('composer.json', json_encode($composerJson, JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . PHP_EOL);

file_replace('README.dist.md', [
    '{$description}' => $description,
]);
rename('README.dist.md', 'README.md');

rename('.gitattributes.dist', '.gitattributes');

file_replace('src/MistyPlugin.php', [
    'namespace Misty\\Plugin' => sprintf('namespace %s', $namespace),
    'class MistyPlugin' => sprintf('class %s', $pluginFullName),
]);
rename('src/MistyPlugin.php', sprintf('src/%s.php', $pluginFullName));

file_replace('phpunit.xml.dist', [
    '<file>src/MistyPlugin.php</file>' => sprintf('<file>src/%s.php</file>', $pluginFullName),
    '<testsuite name="MistyPlugin Testsuite">' => sprintf('<testsuite name="%s Testsuite">', $pluginFullName),
]);

rename('.idea.dist', '.idea');

unlink(__FILE__);
