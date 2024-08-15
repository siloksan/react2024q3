const IMAGE_SIZE = 4 * 1024 * 1024;

const IMAGE_EXTENSIONS = ['jpeg', 'png'];

export function isValidFile(file: unknown): file is FileList {
  return file instanceof FileList && file.length !== 0;
}

export function isImage(file: unknown): file is FileList {
  return isValidFile(file) && file[0].type.startsWith('image/');
}

export function isValidExtension(file: unknown): boolean {
  if (isValidFile(file)) {
    return IMAGE_EXTENSIONS.includes(file[0].name.split('.').pop()!);
  }
  return false;
}

export function isValidSize(file: unknown): boolean {
  if (isValidFile(file)) {
    const firstFile = file[0];
    return firstFile.size <= IMAGE_SIZE;
  }
  return false;
}
