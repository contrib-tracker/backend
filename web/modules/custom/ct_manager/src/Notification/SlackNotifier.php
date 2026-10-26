<?php

declare(strict_types=1);

namespace Drupal\ct_manager\Notification;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Logger\LoggerChannelInterface;
use Drupal\Core\Utility\Error;
use GuzzleHttp\ClientInterface;
use GuzzleHttp\Exception\GuzzleException;

/**
 * Posts a notification to a Slack incoming webhook.
 *
 * The webhook URL and the optional channel, username and icon overrides are
 * read from the `slack.settings` configuration. On Upsun the URL is set with a
 * `drupalconfig:slack.settings:slack_webhook_url` variable (see
 * settings.platformsh.php), so nothing secret lives in the exported config.
 */
class SlackNotifier {

  /**
   * Matches an HTML link, capturing its URL and its label.
   */
  private const LINK_PATTERN = '~<a\s[^>]*href=["\']([^"\']*)["\'][^>]*>(.*?)</a>~si';

  public function __construct(
    private readonly ClientInterface $httpClient,
    private readonly ConfigFactoryInterface $configFactory,
    private readonly LoggerChannelInterface $logger,
  ) {}

  /**
   * Sends a message to Slack.
   *
   * A failure is logged and reported through the return value, never thrown, so
   * that an unreachable Slack cannot stop contributions from being stored.
   *
   * @param string $message
   *   The message. HTML links are converted to Slack links and any other markup
   *   is removed.
   *
   * @return bool
   *   TRUE when Slack accepted the message.
   */
  public function send(string $message): bool {
    $config = $this->configFactory->get('slack.settings');
    $url = (string) $config->get('slack_webhook_url');
    if ($url === '') {
      $this->logger->warning('No Slack webhook URL is configured, the notification was not sent.');
      return FALSE;
    }

    $payload = ['text' => $this->toSlackText($message)];
    foreach (['channel' => 'slack_channel', 'username' => 'slack_username'] as $field => $key) {
      $value = $config->get($key);
      if ($value) {
        $payload[$field] = $value;
      }
    }
    $icon_type = $config->get('slack_icon_type');
    if ($icon_type === 'emoji' && $config->get('slack_icon_emoji')) {
      $payload['icon_emoji'] = $config->get('slack_icon_emoji');
    }
    elseif ($icon_type === 'image' && $config->get('slack_icon_url')) {
      $payload['icon_url'] = $config->get('slack_icon_url');
    }
    $payload['link_names'] = (bool) $config->get('slack_link_names');

    try {
      $this->httpClient->request('POST', $url, ['json' => $payload, 'timeout' => 10]);
    }
    catch (GuzzleException $e) {
      Error::logException($this->logger, $e, 'The Slack notification failed: @message', ['@message' => $e->getMessage()]);
      return FALSE;
    }
    return TRUE;
  }

  /**
   * Converts HTML links to Slack links and escapes the rest as Slack expects.
   */
  private function toSlackText(string $html): string {
    // Splitting on the link pattern with captured groups yields: text, URL,
    // label, text, URL, label, ..., text.
    $parts = preg_split(self::LINK_PATTERN, $html, -1, PREG_SPLIT_DELIM_CAPTURE);
    $text = '';
    foreach ($parts as $i => $part) {
      $text .= match ($i % 3) {
        0 => $this->escape(strip_tags($part)),
        1 => '<' . $part . '|',
        2 => $this->escape(strip_tags($part)) . '>',
      };
    }
    return $text;
  }

  /**
   * Escapes the three characters Slack treats as control characters.
   */
  private function escape(string $text): string {
    return str_replace(['&', '<', '>'], ['&amp;', '&lt;', '&gt;'], $text);
  }

}
