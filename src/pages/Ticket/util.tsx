import { ListType } from './enum';

// 获取颜色
export const getTypeColor = (type: API.ListType): string => {
  switch (type) {
    case ListType.DANGER:
      return '#FF6259';
    case ListType.WARN:
      return '#FE9F0A';
    case ListType.COMMON:
      return '#4496F7';
    default:
      return '#333333';
  }
};
