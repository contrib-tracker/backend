<?php

declare(strict_types=1);

namespace Drupal\ct_manager\Data;

/**
 * Value object for an issue related to a contribution.
 */
final class Issue {

  /**
   * Title.
   *
   * @var string
   */
  protected string $title;

  /**
   * Description.
   *
   * @var string
   */
  protected string $description = '';

  /**
   * URL of the contribution.
   *
   * @var string
   */
  protected string $url;

  public function __construct(string $title, string $url) {
    $this->title = $title;
    $this->url = $url;
  }

  public function getTitle(): string {
    return $this->title;
  }

  public function getUrl(): string {
    return $this->url;
  }

  public function getDescription(): string {
    return $this->description;
  }

  public function setDescription(string $description): self {
    $this->description = $description;
    return $this;
  }

}
