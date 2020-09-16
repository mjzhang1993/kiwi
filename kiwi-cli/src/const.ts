/**
 * @author linhuiw
 * @desc 项目配置文件配置信息
 */

export const KIWI_CONFIG_FILE = 'kiwi-config.json';

export const PROJECT_CONFIG = {
  dir: './.kiwi',
  configFile: `./.kiwi/${KIWI_CONFIG_FILE}`,
  defaultConfig: {
    kiwiDir: './.kiwi',
    configFile: `./.kiwi/${KIWI_CONFIG_FILE}`,
    srcLang: 'zh-CN',
    distLangs: ['en-US', 'zh-TW'],
    googleApiKey: '',
    translateOptions: {
      concurrentLimit: 10,
      requestOptions: {}
    },
    importI18N: `import I18N from 'src/utils/I18N';`,
    ignoreDir: '', // NOTICE: 增加对数组的支持，可以传入 string | string[]
    ignoreFile: '', // NOTICE: 增加对 RegExp 的支持，可以传入 string 或者 RegExp 的字符串
  },
  langMap: {
    ['en-US']: 'en',
    ['en_US']: 'en',
    ['zh-TW']: 'zh-tw'
  },
  zhIndexFile: `import common from './common';

export default Object.assign({}, {
  common
});`,
  zhTestFile: `export default {
    test: '测试'
  }`
};
