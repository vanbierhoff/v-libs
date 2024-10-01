function customHashCode(key: string, value: any): number {
  let hash = 0;
  for(let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i); // Calculate hash for key
  }

  if (typeof value === 'object') {
    hash = (hash << 5) - hash + JSON.stringify(value).length; // Incorporate length of JSON string for object values
  } else {
    hash = (hash << 5) - hash + (value && value.toString()); // Calculate hash for non-object values
  }

  return hash;
}

function generateBitMask(obj: any): number {
  let mask = 0;
  for(const key in obj) {
    if (obj.hasOwnProperty(key)) {
      mask |= 1 << customHashCode(key, obj[key]);
      const value = obj[key];
      if (typeof value === 'object') {
        mask |= generateBitMask(value);
      }
    }
  }
  return mask;
}

export function detectChanges(oldObj: any, newObj: any): boolean {
  const oldMask = generateBitMask(oldObj);
  const newMask = generateBitMask(newObj);
  console.log(oldMask, newMask);
  return oldMask !== newMask;
}

// Usage example
export const oldObject = {name: 'Alice', age: 31, address: {city: 'New York'}};
export const newObject = {name: 'Alice', age: 32, address: {city: 'New York'}};
export const newObject2 = {name: 'Alic', age: 31, address: {city: 'New York'}};

if (detectChanges(oldObject, newObject)) {
  console.log('Changes detected!');
} else {
  console.log('No changes detected.');
}
if (detectChanges(oldObject, newObject2)) {
  console.log('Changes detected! 2');
} else {
  console.log('No changes detected. 2');
}
