#!/usr/bin/env bash

echo "PR_REF is $PR_REF"

TYPE=$(platform environment:info --project $PLATFORM_PROJECT_ID --environment $PR_REF type)
NAME=$(platform environment:info --project $PLATFORM_PROJECT_ID --environment $PR_REF name)


echo "Enviroment type is $TYPE"
echo "Environment name is $NAME"

if [ "$TYPE" = "development" ] && [ -n "$NAME" ]; then
  echo "Deactivating the env on platform.sh"
  platform environment:delete --project $PLATFORM_PROJECT_ID --delete-branch $PR_REF -y
else
  echo "No env found for the PR on Platform.sh"
fi
