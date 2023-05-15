const capitalizeWords = (str: string): string => {
  const words = str?.trim().split(/\s+/);

  const capitalizedWords = words?.map((word) => {
    if (word === '') {
      return word;
    }

    return word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase();
  });

  return capitalizedWords?.join(' ');
}

export default capitalizeWords;