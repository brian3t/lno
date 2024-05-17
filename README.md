### to run: 
npm run build_sm

### install:
```
npm i
git rm --cached src/jslib
rmdir src/jslib
git submodule add git@github.com:brian3t/jslib.git src/jslib
cd src/jslib && npm i 
```

Copy src/js/conf.js.example to conf.js
Copy env.js.example to env.js

### note when building
During dev, in vite.config.js ; must include global  
During prod, must comment the above

### firebase
Android: use google_services.json inside folder b3t into ./android/app/
