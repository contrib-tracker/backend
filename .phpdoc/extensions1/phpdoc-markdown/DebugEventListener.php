<?php

namespace axelerant\PhpDocMarkdown;

use Psr\Log\LoggerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Contracts\EventDispatcher\Event;

class DebugEventListener
{
    private LoggerInterface $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function onAnyEvent(Event $event, string $eventName, EventDispatcherInterface $dispatcher): void
    {
        // exit("sdjshdjshd");
        $this->logger->info("phpDocumentor Event Dispatched: " . $eventName);
    }
}
