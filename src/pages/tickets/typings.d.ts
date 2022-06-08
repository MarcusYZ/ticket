import type { default as ListType, default as QuestionType } from './enum';

// 列表项
declare namespace TICKET {
  type TicketItem = {
    id: number; // 编号
    info: string; // 信息
    avatarUrl: string; // 头像地址
    status: string; // 状态
    priority: ListType; // 优先级s
    date: string; // 时间
    time: string; // 耗时
  };

  // 表单项
  type TicketForm = {
    question?: string; // 常见问题
    detail?: string; // 详细说明
    questionSort?: QuestionType.HISTORY; // 问题分类
    expirationTime?: string; // 发生时间
  };

  // 列表入参
  type TicketParams = {
    level?: ListType;
  };
}
