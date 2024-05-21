<?php

namespace Drupal\ct_user\Controller;

use Drupal\Core\Cache\CacheableJsonResponse;
use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * A controller to get daily patches count for the last 1 year for each user.
 */
class GetUserPatchesController extends ControllerBase {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Constructs a new GetUserPatchesController object.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager) {
    $this->entityTypeManager = $entity_type_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static($container->get('entity_type.manager'));
  }

  /**
   * Returns a JSON response with daily patches count.
   *
   * @param int $current_user_id
   *   The user ID for which you want to retrieve patches.
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   *   The JSON response.
   */
  public function content($current_user_id) {
    $data = [];
    $query = \Drupal::entityQueryAggregate('node')->condition('type', 'code_contribution')
      ->condition('status', TRUE)
      ->condition('field_contribution_author', $current_user_id)->condition('field_code_contrib_patches_count', 0, '>')
      ->groupBy('field_contribution_date')
      ->aggregate('nid', 'COUNT');
    $query->accessCheck(TRUE);
    $data = $query->execute();

    // Add Cache settings for Max-age and URL context.
    // You can use any of Drupal's contexts, tags, and time.
    $data['#cache'] = ['max-age' => 86400];

    $response = new CacheableJsonResponse($data);
    $cacheableMetadata = new CacheableMetadata();
    $response->addCacheableDependency($cacheableMetadata->createFromRenderArray($data));
    return $response;

  }

}
