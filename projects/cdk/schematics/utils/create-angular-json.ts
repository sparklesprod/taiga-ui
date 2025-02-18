import {createSourceFile} from 'ng-morph';

export function createAngularJson(
    {stylesExist}: {stylesExist: boolean} = {stylesExist: false},
): void {
    createSourceFile(
        `angular.json`,
        `
{
  "version": 1,
  "defaultProject": "demo",
  "projects": {
    "demo": {
        "root": "",
        "architect": {
          "build": {
            "options": {
              "main": "test/main.ts",
            ${
                stylesExist
                    ? `"styles": [
                  "node_modules/@taiga-ui/core/styles/taiga-ui-theme.less",
                  "some.style"
                ]
                `
                    : ``
            }}
          }
        }
    }
  }
}`,
        {overwrite: true},
    );
}

export function createAngularJsonWithAssets(): void {
    createSourceFile(
        `angular.json`,
        `
{
  "version": 1,
  "defaultProject": "demo",
  "projects": {
    "demo": {
        "root": "",
        "architect": {
          "build": {
            "options": {
              "main": "test/main.ts",
              "assets": [
              {
                "glob": "**/*",
                "input": "node_modules/@taiga-ui/icons/src",
                "output": "assets/taiga-ui/icons"
              }
            ]
            }
          }
        }
    }
  }
}`,
        {overwrite: true},
    );
}
