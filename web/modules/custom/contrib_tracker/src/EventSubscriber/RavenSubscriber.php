<?php

declare(strict_types = 1);

namespace Drupal\contrib_tracker\EventSubscriber;

use Drupal\raven\Event\OptionsAlter;
use Sentry\Event as SentryEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * @todo Add description for this subscriber.
 */
final class RavenSubscriber implements EventSubscriberInterface {

  public function onRavenOptionsAlter(OptionsAlter $optionsAlter): void {
    $optionsAlter->options['before_send'] = function (SentryEvent $event): ?SentryEvent {
      if (str_starts_with($event->getMessage(), 'The submitted value')) {
        return NULL;
      }
      return $event;
    };
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    return [
      OptionsAlter::class => ['onRavenOptionsAlter'],
    ];
  }

}
