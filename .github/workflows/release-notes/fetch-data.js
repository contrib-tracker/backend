module.exports = async () => {

  function buildUrl(params) {
    const baseUrl = 'https://www.drupal.org/api-d7/node.json';
    const query = new URLSearchParams(params).toString();
    return `${baseUrl}?${query}`;
  }

  function parseVersion(versionStr) {
    const semverRegex = /^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/;
    const match = versionStr.match(semverRegex);

    if (!match) {
      return {
        version: versionStr,
        matches: false,
      };
    }

    const [, major, minor, patch, pre] = match;

    return {
      version: versionStr,
      matches: true,
      major: parseInt(major, 10),
      minor: parseInt(minor, 10),
      patch: parseInt(patch, 10),
      pre: pre ? [pre] : undefined,
      build: undefined,
    };
  }

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fetchRelease(package_name, version) {

    // Fetch project data.
    const projectParams = {
      field_project_machine_name: package_name.replace('drupal/', ''),
    };

    //Specific to drupal/core package
    if (package_name == 'drupal/core') {
      projectParams.type = 'project_core';
      projectParams.field_project_machine_name = 'drupal';
    }

    const projectUrl = buildUrl(projectParams);
    const projectData = await fetchData(projectUrl);

    if (!projectData || !projectData.list || projectData.list.length === 0) {
      console.error('Project data not found');
      return 'Project data not found';
    }
    const project = projectData.list[0];

    const versionData = parseVersion(version);

    // Fetch release data.
    let params = {
      type: 'project_release',
      field_release_project: project.nid,
    };
    if (!versionData.matches) {
      params.field_release_version = version;
    }
    else {
      if (versionData.major) {
        params.field_release_version_major = versionData.major.toString();
      }
      if (versionData.minor) {
        params.field_release_version_minor = versionData.minor.toString();
      }
      if (versionData.patch) {
        params.field_release_version_patch = versionData.patch.toString();
      }
      if (versionData.pre) {
        params.field_release_version_extra = versionData.pre.join('.');
      }
    }
    const releaseUrl = buildUrl(params);
    const releaseData = await fetchData(releaseUrl);
    if (releaseData && releaseData.list && releaseData.list.length > 0) {
      const releases = releaseData.list.map(item => item.body.value)
      return releases.join('<br>');
    }
    return "no release note found"
  }

  async function fetchProjectReleases() {
    const jsonData = JSON.parse(require('fs').readFileSync('composer-diff.json', 'utf8'));
    // Check if 'drupal/core-recommended' is present
    let coreVersion = null;
    if (jsonData.changes['drupal/core-recommended']) {
      coreVersion = jsonData.changes['drupal/core-recommended'][1];
    }

    const packages = {};
    for (const category in jsonData) {
      for (const packageName in jsonData[category]) {
        const [oldVersion, newVersion, url] = jsonData[category][packageName];
        if (oldVersion == 'NEW') {
          continue;
        }
        if (packageName.startsWith('drupal/core-') || packageName === 'drupal/core') {
          if (!coreVersion) {
            coreVersion = jsonData[category][packageName][1];
          }
        }
        else if (packageName.startsWith('drupal/')) {
          packages[packageName] = newVersion;
        }
      }
    }

    if (coreVersion) {
      packages['drupal/core'] = coreVersion;
    }

    let releaseHtml = "**Drupal eco-system packages release notes**<br>";
    for (const packageName in packages) {
      const version = packages[packageName];
      releaseHtml += '<details><summary>Realase notes for package `' + packageName + '`</summary><br><blockquote>';
      releaseHtml += await fetchRelease(packageName, version)
      releaseHtml += '</blockquote></details>';
    }
    return releaseHtml;
  }

  return await fetchProjectReleases();
}
