<?php

declare(strict_types=1);

namespace Drupal\ct_manager\Data;

/**
 * Value object for a code contribution.
 */
final class CodeContribution {

  /**
   * Title.
   *
   * @var string
   */
  protected string $title;

  /**
   * Date of the contribution.
   *
   * @var \DateTimeImmutable
   */
  protected \DateTimeImmutable $date;

  /**
   * URL of the contribution.
   *
   * @var string
   */
  protected string $url;

  /**
   * URL of user account on the platform.
   *
   * @var string
   */
  protected string $accountUrl;

  /**
   * Description.
   *
   * @var string
   */
  protected string $description = '';

  /**
   * Project.
   *
   * @var string
   */
  protected string $project = '';

  /**
   * ProjectUrl.
   *
   * @var string
   */
  protected string $projectUrl = '';

  /**
   * Patch count.
   *
   * @var int
   */
  protected int $patchCount = 0;

  /**
   * File count.
   *
   * @var int
   */
  protected int $filesCount = 0;

  /**
   * Status.
   *
   * @var string
   */
  protected string $status = '';

  /**
   * Technology.
   *
   * @var string
   */
  protected string $technology = '';

  /**
   * Related issue.
   *
   * @var \Drupal\ct_manager\Data\Issue
   */
  protected ?Issue $issue = NULL;

  public function __construct(string $title, string $url, \DateTimeImmutable $date) {
    $this->title = $title;
    $this->url = $url;
    $this->date = $date;
  }

  public function getTitle(): string {
    return $this->title;
  }

  public function getUrl(): string {
    return $this->url;
  }

  public function getDate(): \DateTimeImmutable {
    return $this->date;
  }

  public function getAccountUrl(): string {
    return $this->accountUrl;
  }

  public function setAccountUrl(string $accountUrl): self {
    $this->accountUrl = $accountUrl;
    return $this;
  }

  public function getDescription(): string {
    return $this->description;
  }

  public function setDescription(string $description): self {
    $this->description = $description;
    return $this;
  }

  public function getProject(): string {
    return $this->project;
  }

  public function setProject(string $project): self {
    $this->project = $project;
    return $this;
  }

  public function getProjectUrl(): string {
    return $this->projectUrl;
  }

  public function setProjectUrl(string $projectUrl): self {
    $this->projectUrl = $projectUrl;
    return $this;
  }

  public function getIssue(): ?Issue {
    return $this->issue;
  }

  public function setIssue(Issue $issue): self {
    $this->issue = $issue;
    return $this;
  }

  public function getPatchCount(): int {
    return $this->patchCount;
  }

  public function setPatchCount(int $patchCount): self {
    $this->patchCount = $patchCount;
    return $this;
  }

  public function getFilesCount(): int {
    return $this->filesCount;
  }

  public function setFilesCount(int $filesCount): self {
    $this->filesCount = $filesCount;
    return $this;
  }

  public function getStatus(): string {
    return $this->status;
  }

  public function setStatus(string $status): self {
    $this->status = $status;
    return $this;
  }

  public function getTechnology(): string {
    return $this->technology;
  }

  public function setTechnology(string $technology): self {
    $this->technology = $technology;
    return $this;
  }

}
