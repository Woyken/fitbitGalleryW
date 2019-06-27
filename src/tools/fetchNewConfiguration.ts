import * as fs from 'fs';
import { FitbitConfigurationResponseRoot } from '../types/fitbitGalleryTypes';
import fetch from 'node-fetch';

if (typeof window !== 'undefined') {
    throw new Error('This module should not be used in browser environment!');

}

class ConfigurationFetcher {
    public static async getData() {
        const response = await fetch('https://gallery.fitbit.com/_internal/config', {
            method: 'GET',
        });
        const resultObj = (await response.json()) as FitbitConfigurationResponseRoot;
        return resultObj;
    }

    public static async writeData() {
        const data = await this.getData();
        if (!fs.existsSync('src/generatedConfig')) {
            fs.mkdirSync('src/generatedConfig', {});
        }
        fs.writeFileSync('src/generatedConfig/configuration.json', JSON.stringify(data));
    }
}

ConfigurationFetcher.writeData().then(() => {
    console.log('done');
}).catch((e) => {
    console.error(`failed to write data: ${e}`);
});
