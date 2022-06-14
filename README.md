# Check Version Gradle 

## Overview 

This action checks to see if a package with the current version has already been published.

## Inputs

`organization`: optional parameter of the org name if using for a package owned by an organization  
`access-token`: personal access token with package read access for the repository

## Outputs

`changed`: either "true" or "false", indicates if the version has been published  
`version`: if the version changed, it shows the new version number

## Example usage

```yaml
      - name: Check if Package Version Published
        id: version_check
        uses: jyeany/version-check-gradle@1.0.2
        with:
          organization: 'my-org' # optional parameter
          access-token: ${{ secrets.MY_ACCESS_TOKEN }}

      - name: Publish Package
        if: steps.version_check.outputs.changed
        id: publish_calculator_lib
        run: ./gradlew publish
        env:
          GITHUB_ACTOR: ${{ secrets.GITHUB_ACTOR }}
          GITHUB_TOKEN: ${{ secrets.PUBLISH_PACKAGES_PAT }}
```
