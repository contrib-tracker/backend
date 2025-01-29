<?php

namespace axelerant\PhpDocMarkdown;

use phpDocumentor\Extension\Extension;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Reference;

class ServiceExtension extends Extension
{
    public function load(array $configs, ContainerBuilder $container): void
    {

        // Register UrlExtension for Twig
        $container->register('twig.extension', UrlExtension::class)
            ->addTag('twig.extension');

        // Register Event Listener for Debugging Events
        $container->register('kernel.event_listener', DebugEventListener::class)
            ->addArgument(new Reference('logger'))
            ->addTag('kernel.event_listener', ['event' => '*', 'method' => 'onAnyEvent']);

    }
}
