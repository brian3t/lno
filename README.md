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
Make sure framework7.json has cwd pointing to the correct folder

### note when building
During dev, in vite.config.js ; must include global  
During prod, must comment the above

### firebase
Android: use google_services.json inside folder b3t into ./android/app/

### Android icons: 
use https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html#foreground.type=image&foreground.space.trim=1&foreground.space.pad=0&foreColor=rgba(96%2C%20125%2C%20139%2C%200)&backColor=rgb(255%2C%20255%2C%20255)&crop=0&backgroundShape=square&effects=none&name=ic_launcher 
to generate ic_launcher
