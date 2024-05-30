const hashList = new Map();

export function hashGenerator(name: string, length: number = 14) {
  let result = 'v-theme--';
  const characters = 'Zabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  if (hashList.has(result)) {
    return hashGenerator(name);
  }
  hashList.set(name, result);
  return result;

}

export function hasCssHash(name: string): false | string {
  const hash = hashList.get(name);
  if (hash) {
    return hash;
  }
  return false;
}
