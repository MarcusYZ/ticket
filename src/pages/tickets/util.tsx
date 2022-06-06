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

// 获取优先级对应的文字
export const getPriorityText = (type: API.ListType) => {
  switch (type) {
    case ListType.DANGER:
      return '紧急';
    case ListType.WARN:
      return '高';
    case ListType.COMMON:
      return '中';
    default:
      return '低';
  }
};
