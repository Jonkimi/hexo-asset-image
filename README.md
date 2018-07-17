# hexo-asset-image

Convert relative asset path to absolute path automatically. 
With `post_asset_folder` set to `true`, and using relative assets path in posts and pages, asset links in markdown source file can be rendered correctly by editors.

It assumes that:
1. posts with permalink "http[s]//yoursite/:year/:month/:day/title/"
2. pages with permalink "http[s]//yoursite/title/index.html".


# Install

```shell
npm install hexo-asset-image --save
```

# Example

```shell
source
├── _post
|    ├── hello-world
|    |    ├── logo.png
|    |    └── info.pdf
|    └── hello-world.md
├── about
|    ├── index.md
|    |    ├── avatar.png
|    |    └── resume.pdf
|    └── index.md
└── assets
     └── abs.pdf
```

Make sure `post_asset_folder: true` in your `_config.yml`.

In hello-world.md:
1. `![logo](hello-world/logo.png)` 
2. `[info](hello-world/info.pdf)`

In about/index.md:
1. `![avatar](index/avatar.png)`
2. `[resume](index/resume.pdf)`

After post render, relative asset path will be converted:

In hello-world.html:
1. `<img src="/:year/:month/:day/hello-world/logo.png" alt="logo">`
2. `<a href="/:year/:month/:day/hello-world/info.pdf">info</a>`

In about/index.html:
1. `<img src="/about/index/avatar.png" alt="avatar">`
2. `<a href="/about/index/resume.pdf">resume</a>`

And absolute path (starts with `\`) keep unchanged.