<?php

declare(strict_types=1);

use Shopware\Core\TestBootstrapper;

$loader = (new TestBootstrapper())
    ->setProjectDir(__DIR__.'/../vendor/shopware/platform')
    ->addCallingPlugin()
    ->setForceInstallPlugins(!getenv('NO_FORCE_INSTALL_PLUGINS'))
    ->bootstrap()
    ->getClassLoader();
