export class DataFormat {
  countEqualWords = (arrWords: string[]): any => {
    const count = {};
    arrWords.forEach((i) => {
      count[i] = (count[i]||0) + 1;
    });

    return count;
  }

  sortArrayByKey = (arr: any[], key: string): string[] => {
    return arr.sort((a, b) => b[key] - a[key])
  }

  searchTextByParam = (param: RegExp, text: string): string[] => {
    return param.exec(text);
  }
}
