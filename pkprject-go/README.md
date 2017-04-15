# About frontend

### Installation

```sh
$ npm install
$ make watch_tpl
Visit http://192.168.59.103:8000/kb/manage/institute/list
```

### Release

1. Ensure everything you want to release has been merged to master.
1. Visit https://jenkins.applysquare.net, login with user ```dev``` (ask for password from tech leads).
1. Click go-build-release -> Build.
1. Wait until it is finished.
1. Cilck applysquare-django-deploy -> Build for actual deployment.
1. Visit https://www.applysquare.com to ensure everything works.

### Update subschema

1. Ensure you changes of subschema is committed and pushed to ```opensource/subschema```.
1. Copy the commit ID, and update it in package.json.
