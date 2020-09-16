/**
 * @author doubledream
 * @desc 文件处理方法
 */

import * as path from 'path';
import * as _ from 'lodash';
import * as fs from 'fs';

// 格式化 ignoreDirectory
function formatIgnoreDirectory(dir) {
  if (!dir) return '';
  if (!/^\//.test(dir)) { dir = '/' + dir; }
  if (!/\/$/.test(dir)) { dir = dir + '/'; }
  return dir;
}

function formatIgnoreFile(file) {
  return !file ? '' : /^\//.test(file) ? file : '/' + file;
}

/**
 * 获取文件夹下符合要求的所有文件
 * @function getSpecifiedFiles
 * @param  {string} dir 路径
 * @param {ignoreDirectory} 忽略文件夹 {ignoreFile} 忽略的文件
 */
function getSpecifiedFiles(dir: string, ignoreDirectory?: string | string[], ignoreFile?: string | RegExp) {
  return fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    const isFile = fs.statSync(name).isFile();

    if (isDirectory) {
      return files.concat(getSpecifiedFiles(name, ignoreDirectory, ignoreFile));
    }

    // 格式化为 string[]
    ignoreDirectory = !ignoreDirectory ? [] : Array.isArray(ignoreDirectory) ? ignoreDirectory : [ignoreDirectory];
    const dirName = formatIgnoreDirectory(path.dirname(name));
    const isNotIgnoreDirectory = !ignoreDirectory.some(d => dirName.indexOf(formatIgnoreDirectory(d)) > -1);
    let isNotIgnoreFile = true;

    if (ignoreFile instanceof RegExp) {
      isNotIgnoreFile = !ignoreFile.test(name);
    } else if (ignoreFile && typeof ignoreFile === 'string') {
      isNotIgnoreFile = !formatIgnoreFile(name).endsWith(formatIgnoreFile(ignoreFile));
    }

    if (isFile && isNotIgnoreDirectory && isNotIgnoreFile) {
      return files.concat(name);
    }
    return files;
  }, []);
}

/**
 * 读取文件
 * @param fileName
 */
function readFile(fileName) {
  if (fs.existsSync(fileName)) {
    return fs.readFileSync(fileName, 'utf-8');
  }
}

/**
 * 读取文件
 * @param fileName
 */
function writeFile(filePath, file) {
  if (fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, file);
  }
}

export { getSpecifiedFiles, readFile, writeFile };
