<?php

namespace axelerant\PhpDocMarkdown;

use Twig\Error\RuntimeError;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class UrlExtension extends AbstractExtension
{

    /**
     * {@inheritdoc}
     * @return TwigFilter[]
     */
    public function getFilters(): array
    {
        return [
            new TwigFilter('markdown_route', array($this, 'markdownRoute')),
        ];
    }

    /**
     * Transforms an object into a JSON string.
     *
     * @param $object
     *
     * @return string JSON string.
     * @throws RuntimeError
     */
    public function markdownRoute($object): string
    {

        return "sjdhjsdh" . $object;
    }
}
