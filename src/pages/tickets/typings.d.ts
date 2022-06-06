import type ListType from './enum';

export type TicketItem = {
  info: string; // 信息
  avatarUrl: string; // 头像地址
  status: string; // 状态
  priority: ListType; // 优先级s
  date: string; // 时间
  time: string; // 耗时
};
