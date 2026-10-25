<?php

declare(strict_types=1);

namespace Drupal\Tests\ct_manager\Unit\Notification;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Config\ImmutableConfig;
use Drupal\Core\Logger\LoggerChannelInterface;
use Drupal\ct_manager\Notification\SlackNotifier;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Middleware;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
use PHPUnit\Framework\TestCase;

/**
 * Tests the Slack notifier.
 *
 * @group ct_manager
 * @coversDefaultClass \Drupal\ct_manager\Notification\SlackNotifier
 */
class SlackNotifierTest extends TestCase {

  /**
   * Requests that the mocked HTTP client received.
   *
   * @var array
   */
  private array $history = [];

  /**
   * Builds a notifier whose HTTP client replays the given responses.
   */
  private function notifier(array $responses, array $settings, ?LoggerChannelInterface $logger = NULL): SlackNotifier {
    $this->history = [];
    $stack = HandlerStack::create(new MockHandler($responses));
    $stack->push(Middleware::history($this->history));
    return new SlackNotifier(
      new Client(['handler' => $stack]),
      $this->configFactory($settings),
      $logger ?? $this->createMock(LoggerChannelInterface::class),
    );
  }

  /**
   * Builds a config factory whose slack.settings holds the given values.
   */
  private function configFactory(array $settings): ConfigFactoryInterface {
    $config = $this->createMock(ImmutableConfig::class);
    $config->method('get')->willReturnCallback(fn (string $key) => $settings[$key] ?? NULL);
    $factory = $this->createMock(ConfigFactoryInterface::class);
    $factory->method('get')->with('slack.settings')->willReturn($config);
    return $factory;
  }

  /**
   * Returns the decoded JSON body of the request at the given position.
   */
  private function sentPayload(int $index = 0): array {
    return json_decode((string) $this->history[$index]['request']->getBody(), TRUE);
  }

  /**
   * @covers ::send
   */
  public function testPostsLinksAndOptionsToTheWebhook(): void {
    $notifier = $this->notifier([new Response(200, [], 'ok')], [
      'slack_webhook_url' => 'https://hooks.slack.test/T1/B2/abc',
      'slack_channel' => '#contrib',
      'slack_username' => 'Tracker',
      'slack_icon_type' => 'emoji',
      'slack_icon_emoji' => ':drupal8:',
      'slack_link_names' => TRUE,
    ]);

    $sent = $notifier->send('<a href="https://www.drupal.org/u/jane">Jane</a> posted on <a href="https://www.drupal.org/i/1">Fix <b>it</b> & more</a>.');

    $this->assertTrue($sent);
    $this->assertCount(1, $this->history);
    $this->assertSame('POST', $this->history[0]['request']->getMethod());
    $this->assertSame('https://hooks.slack.test/T1/B2/abc', (string) $this->history[0]['request']->getUri());
    $this->assertSame([
      'text' => '<https://www.drupal.org/u/jane|Jane> posted on <https://www.drupal.org/i/1|Fix it &amp; more>.',
      'channel' => '#contrib',
      'username' => 'Tracker',
      'icon_emoji' => ':drupal8:',
      'link_names' => TRUE,
    ], $this->sentPayload());
  }

  /**
   * @covers ::send
   */
  public function testOmitsUnsetOverrides(): void {
    $notifier = $this->notifier([new Response(200)], [
      'slack_webhook_url' => 'https://hooks.slack.test/x',
      'slack_channel' => '',
      'slack_username' => '',
      'slack_icon_type' => 'none',
      'slack_link_names' => FALSE,
    ]);

    $notifier->send('Plain <script>text</script> & <more>');

    $this->assertSame([
      'text' => 'Plain text &amp; ',
      'link_names' => FALSE,
    ], $this->sentPayload());
  }

  /**
   * @covers ::send
   */
  public function testDoesNothingWithoutAWebhookUrl(): void {
    $logger = $this->createMock(LoggerChannelInterface::class);
    $logger->expects($this->once())->method('warning');
    $notifier = $this->notifier([], ['slack_webhook_url' => ''], $logger);

    $this->assertFalse($notifier->send('Hello'));
    $this->assertCount(0, $this->history);
  }

  /**
   * @covers ::send
   */
  public function testReportsFailuresWithoutThrowing(): void {
    $logger = $this->createMock(LoggerChannelInterface::class);
    $logger->expects($this->atLeastOnce())->method('log');
    $notifier = $this->notifier([
      new Response(500, [], 'Server Error'),
      new ConnectException('Could not resolve host', new Request('POST', 'https://hooks.slack.test/x')),
    ], ['slack_webhook_url' => 'https://hooks.slack.test/x'], $logger);

    $this->assertFalse($notifier->send('Hello'), 'A 500 response is a failure.');
    $this->assertFalse($notifier->send('Hello'), 'An unreachable Slack is a failure.');
  }

}
