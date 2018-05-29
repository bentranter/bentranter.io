# Crystal and Kemal

* `crystal init` your app.
* Make a public directory in the top level of your app, ie, `/public` should be at the same level as `/src`.
* Also, it won't list the directories at `/`, even with `dir_listing` turned on.

The beginning of the app was literally just,

```crystal
require "kemal"
Kemal.run
```