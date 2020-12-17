export function isInvalidKey(encodedKey: string, prefix: string) {
    return encodedKey.indexOf(prefix) === -1;
  }

export function encodeKey(key: string, prefix: string) {
    return `${prefix}${key}`;
  }

export function decodeKey(encodedKey: string, prefix: string) {
  return isInvalidKey(encodedKey, prefix) ? null : encodedKey.replace(prefix, '');
}