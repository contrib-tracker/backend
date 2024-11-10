<?php

declare(strict_types=1);

namespace Drupal\ct_github;

use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Config\ConfigFactory;
use Github\AuthMethod;
use Github\Client;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;

/**
 * Github Query Class.
 *
 * This class is responsible for constructing a GraphQL query
 * and making API requests of Issues, Issue Comments and
 * Pull Requests.
 */
class GithubQuery {

  /**
   * Establish connection to client.
   *
   * @var \Github\Client
   */
  protected $client;

  /**
   * Cache backend service.
   *
   * @var \Drupal\Core\Cache\CacheBackendInterface
   */
  protected $cache;
  protected $logger;
  /**
   * Set authentication token to access GitHub API.
   *
   * @param \Drupal\Core\Config\ConfigFactory $config_factory
   *   The config factory.
   * @param \Drupal\Core\Cache\CacheBackendInterface $cacheBackend
   *   The injected cache backend service.
   */
  public function __construct(ConfigFactory $config_factory, CacheBackendInterface $cacheBackend,  LoggerChannelFactoryInterface $loggerFactory) {
    $config = $config_factory->get('ct_github.settings');
    $token = $config->get('github_auth_token');
    $client = (strlen($token) === 40) ? (new Client())->authenticate($token, NULL, AuthMethod::ACCESS_TOKEN) : NULL;
    
    $this->client = $client;
    $this->cache = $cacheBackend;
    $this->logger = $loggerFactory->get('ct_github'); // Assigning the logger channel directly here
  }

  /**
   * GraphQL query to get contributions associated with a user.
   *
   * @param string $username
   *   The Github username.
   *
   * @return string
   *   Github Graphql query object
   */
  public function getQuery(string $username): string {
    $query = <<<QUERY
                  query{
                    user(login: "$username"){
                      issues(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
                        nodes {
                          url
                          title
                        }
                      }
                      pullRequests(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
                        nodes {
                          url
                          title
                          commits(last: 100) {
                            nodes {
                              commit {
                                repository {
                                  name
                                }
                                url
                                committedDate
                                authoredByCommitter
                                message
                              }
                            }
                          }
                        }
                      }
                      issueComments(last: 100) {
                        nodes {
                          url
                          body
                          createdAt
                          issue {
                            url
                            title
                            repository {
                              name
                            }
                          }
                        }
                      }
                    }
                  }
                QUERY;

    return $query;
  }

  /**
   * Check username validity.
   */
  public function isUserValid(string $username): bool {
    $cid = 'ct_github:user:' . $username;
    if ($this->client === NULL) {
      return FALSE;
  }
    $cache = $this->cache->get($cid);
    if ($cache) {
      return $cache->data == 'valid';
    }
    $userContributions = $this->getUserContributions($username);
    if (!isset($userContributions['data']['user'])) {
      $this->cache->set($cid, 'invalid');
      return FALSE;
    }
    $this->cache->set($cid, 'valid');
    return TRUE;
  }

  /**
   * API request to get user contributions.
   */
  public function getUserContributions(string $username) {
    if ($this->client === NULL) {
      return NULL;
    }
    $query = $this->getQuery($username);
    $maxRetries = 5;
    $retryCount = 0;
    $waitTime = 1; // Initial wait time in seconds for backoff

    while ($retryCount < $maxRetries) {
      try {
        return $this->client->api('graphql')->execute($query);
      } catch (Github\Exception\RuntimeException $e) {
        // Check if the error is due to bad credentials
        if ($e->getMessage() === 'Bad credentials') {
          $this->logger->error('GitHub API error: Bad credentials. Please check the credentials.');
          return NULL;
        }

        // Handle other errors with backoff
        $retryCount++;
        $this->logger->warning("GitHub API request failed. Retry $retryCount/$maxRetries. Error: " . $e->getMessage());

        // Stop retries if max retries reached
        if ($retryCount >= $maxRetries) {
          $this->logger->error("GitHub API request failed after $maxRetries attempts.");
          return NULL;
        }

        // Wait before retrying with exponential backoff
        sleep($waitTime);
        $waitTime *= 2; // Double the wait time for exponential backoff
      }
    }
  }
}
