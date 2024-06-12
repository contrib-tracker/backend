<?php

namespace Drupal\ct_user\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
* Provides a block with a contribution commit graph.
*
* @Block(
*   id = "contrib_graph_blocl",
*   admin_label = @Translation("Contribution commit graph"),
*   category = "Custom"
* )
*/
class ContribGraph extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#theme' => 'contrib_graph',
    ];
  }

}
