<?php

declare(strict_types=1);

namespace Drupal\ct_github\Plugin\ContributionSource;

use Drupal\Component\Plugin\PluginBase;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\ct_github\GithubQuery;
use Drupal\ct_github\GithubRetriever;
use Drupal\ct_manager\ContributionSourceInterface;
use Drupal\ct_manager\Data\CodeContribution;
use Drupal\user\Entity\User;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Retrieve and Store contributions from github.com.
 *
 * @ContributionSource(
 *   id = "github",
 *   description = @Translation("Retrieve and store contribution data from github."),
 * )
 */
class GithubContribution extends PluginBase implements ContributionSourceInterface, ContainerFactoryPluginInterface {

  /**
   * Entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Retrievers for each user.
   *
   * @var \Drupal\ct_github\GithubRetriever[]
   */
  protected $retriever = [];

  /**
   * Github request query.
   *
   * @var \Drupal\ct_github\GithubQuery
   */
  protected GithubQuery $query;
  /**
   * GitHub Token Validity
   */
  protected bool $tokenValid;

  /**
   * Constructs a Drupal\rest\Plugin\ResourceBase object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin_definition for the plugin instance.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   *   The injected entity type manager service.
   * @param \Drupal\ct_github\GithubQuery $query
   *   The injected github query service.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entityTypeManager, GithubQuery $query, ConfigFactoryInterface $configFactory) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entityTypeManager = $entityTypeManager;
    $this->query = $query;
    $this->configFactory = $configFactory;
    /**
     * Check Github token availability and execute
     */
    $token = $this->configFactory->get('ct_github.settings')->get('github_auth_token');
    $this->tokenValid = (strlen($token) >= 40);
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('entity_type.manager'),
      $container->get('ct_github.query'),
      $container->get('config.factory')
    );
  }

  /**
   * Get all users with github username.
   */
  public function getUsers() {
    if (!$this->tokenValid) {
      return [];
    }
    $uids = $this->entityTypeManager->getStorage('user')->getQuery()
      ->accessCheck(TRUE)
      ->condition('field_github_username', '', '!=')
      ->condition('status', 1)
      ->execute();
    $users = $this->entityTypeManager->getStorage('user')->loadMultiple($uids);
    return $users;
  }

  /**
   * {@inheritdoc}
   */
  public function isUserValid(User $user): bool {
    if (!$this->tokenValid) {
      return FALSE;
    }
    $username = $user->field_github_username[0]->getValue()['value'];
    return $this->query->isUserValid($username);
  }

  /**
   * Returns a user retriever object.
   */
  protected function getOrCreateRetriever(User $user): GithubRetriever {
    if (!$this->tokenValid) {
      return NULL;
    }
    $username = $user->field_github_username[0]->getValue()['value'];
    if (isset($this->retriever[$username])) {
      return $this->retriever[$username];
    }
    $this->retriever[$username] = new GithubRetriever($this->query, $username);
    return $this->retriever[$username];
  }

  /**
   * {@inheritdoc}
   */
  public function getUserIssues(User $user) {
    if (!$this->tokenValid) {
      return [];
    }
    return $this->getOrCreateRetriever($user)->getIssues();
  }

  /**
   * {@inheritdoc}
   */
  public function getUserCodeContributions(User $user) {
    if (!$this->tokenValid) {
      return [];
    }
    return $this->getOrCreateRetriever($user)->getCodeContributions();
  }

  /**
   * {@inheritdoc}
   */
  public function getNotificationMessage(CodeContribution $contribution, User $user): string {
    $commentBody = $contribution->getDescription() ?: '';
    $commentBody = (strlen($commentBody) > 80) ? (substr($commentBody, 0, 77) . '...') : '';
    $issue = $contribution->getIssue();
    $msg = sprintf('<a href="%s">%s</a>', $contribution->getAccountUrl(), $user->getDisplayName());
    $msg .= sprintf(' posted a comment on <a href="%s">%s</a>', $contribution->getUrl(), $issue->getTitle());
    $msg .= sprintf(' in project <a href="%s">%s</a>.', $contribution->getProjectUrl(), $contribution->getProject());
    $msg .= "\n";
    $msg .= $commentBody;

    return $msg;
  }

}
