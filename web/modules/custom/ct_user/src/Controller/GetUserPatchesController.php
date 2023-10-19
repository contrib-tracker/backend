<?php

namespace Drupal\ct_user\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use DateTime;
use DateTimeZone;
use Drupal\Core\Datetime\DrupalDateTime;

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
    return new static(
      $container->get('entity_type.manager')
    );
  }

  /**
   * Returns a JSON response with daily patches count for the last 1 year.
   *
   * @param int $current_user_id
   *   The user ID for which you want to retrieve patches.
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   *   The JSON response.
   */
  public function content($current_user_id) {
    $days = 366;
    $data = [];
    $key = 0;
    $current_date = date('Y-m-d');

    while ($days > 0) {
        $query = \Drupal::entityQuery('node')
        ->condition('type', 'code_contribution')
        ->condition('field_contribution_date', $current_date)
        ->condition('status', TRUE)
        ->condition('field_contribution_author', $current_user_id)
        // get patches count
        ->condition('field_code_contrib_patches_count', 0, '>')
        ->count();
        $query->accessCheck(TRUE);
        $nids = $query->execute();
        $data[$key]['patch_count'] = $nids;
        $data[$key]['patch_date'] = $current_date;
        $days = $days - 1;
        $key = $key + 1;
        $given_date = new DateTime($current_date);
        $given_date->modify('-1 day');
        $current_date = $given_date->format('Y-m-d');
    }
    return new JsonResponse($data);

  }

}
