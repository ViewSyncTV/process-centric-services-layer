# Backend

## Description

Backend for ViewSyncTv website.

## Code style

The following project uses eslint to enforce a consistent code style. The rules are defined in the `.eslintrc.js` file. \
It also has some prettier rules defined in the `.prettierrc.js` file in order to format the code. \
Finally there is a `.editorconfig` file to enforce some rules in the editor.

Make sure to have the **eslint**, **prettier** and **editorconfig** extensions installed in your editor.

## Response Schema

The response schema for the api calls is the following:

**Success:**

```json
{
    "data": {
        ...
    }
}
```

**Error:**

```json
{
    "error": {
        "code": 0,
        "message": "Error message",
    }
}
```

In order to check if the response is an error or not, you can check if the `error` key is present in the response.

```javascript
if ("error" in response) {
    // Handle error
} else {
    // Handle success
}
```
