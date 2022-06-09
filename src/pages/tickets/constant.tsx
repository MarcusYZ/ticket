import { CommonQuestion, ListType } from './enum';

// 常用问题税数据
export const commonQuestion = [
  { label: CommonQuestion.ONE, value: CommonQuestion.ONE },
  { label: CommonQuestion.TWO, value: CommonQuestion.TWO },
  { label: CommonQuestion.THREE, value: CommonQuestion.THREE },
];

export const more_data = [
  {
    avatarUrl: 'https://randomuser.me/api/portraits/men/19.jpg',
    question: '1号咖啡机损坏',
    status: '待运维处理',
    priority: ListType.DANGER,
    date: '2021-04-08 01:18',
    time: '逾期 3 天 22 小时 44分',
  },
  {
    avatarUrl: 'https://randomuser.me/api/portraits/women/82.jpg',
    question: '2号咖啡机损坏',
    status: '待运维处理',
    priority: ListType.WARN,
    date: '2021-04-08 01:18',
    time: '逾期 3 天 22 小时 44分',
  },
  {
    avatarUrl: 'https://randomuser.me/api/portraits/women/40.jpg',
    question: '3号饮水机损坏',
    status: '待运维处理',
    priority: ListType.COMMON,
    date: '2021-04-08 01:18',
    time: '逾期 3 天 22 小时 44分',
  },
  {
    avatarUrl: 'https://randomuser.me/api/portraits/women/40.jpg',
    question: '4号饮水机损坏',
    status: '待运维补充材料',
    priority: ListType.NORMAL,
    date: '2021-04-08 01:18',
    time: '逾期 3 天 22 小时 44分',
  },
];
