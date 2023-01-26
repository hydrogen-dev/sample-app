import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.domain.hydrogenSampleApp',
  appName: 'HydrogenSampleApp',
  webDir: 'www',
  bundledWebRuntime: false,
    server: {
      hostname: 'localhost:7029',
  },
};

export default config;
