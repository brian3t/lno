import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.socalappsolutions.sdevents',
  appName: 'SD Events',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
