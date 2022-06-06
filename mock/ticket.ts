import { Request, Response } from 'express';

enum ListType {
  DANGER = 'DANGER', // 紧急
  WARN = 'WARN', // 警告
  COMMON = 'COMMON', // 一般
  NORMAL = 'NORMAL', // 正常
}

// 等待
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const getTicketList = async (req: Request, res: Response) => {
  await waitTime(1000);
  res.json({
    data: [
      {
        avatarUrl: 'https://randomuser.me/api/portraits/men/19.jpg',
        info: '1号咖啡机损坏',
        status: '待运维处理',
        priority: ListType.DANGER,
        date: '2021-04-08 01:18',
        time: '逾期 3 天 22 小时 44分',
      },
      {
        avatarUrl: 'https://randomuser.me/api/portraits/women/82.jpg',
        info: '2号咖啡机损坏',
        status: '待运维处理',
        priority: ListType.WARN,
        date: '2021-04-08 01:18',
        time: '逾期 3 天 22 小时 44分',
      },
      {
        avatarUrl: 'https://randomuser.me/api/portraits/women/40.jpg',
        info: '3号饮水机损坏',
        status: '待运维处理',
        priority: ListType.COMMON,
        date: '2021-04-08 01:18',
        time: '逾期 3 天 22 小时 44分',
      },
      {
        avatarUrl: 'https://randomuser.me/api/portraits/women/40.jpg',
        info: '4号饮水机损坏',
        status: '待运维补充材料',
        priority: ListType.NORMAL,
        date: '2021-04-08 01:18',
        time: '逾期 3 天 22 小时 44分',
      },
    ],
  });
};

const getNearestTicketList = (req: Request, res: Response) => {
  res.json({
    data: [
      {
        avatarUrl: 'https://randomuser.me/api/portraits/men/19.jpg',
        info: '1号咖啡机损坏',
      },
      {
        avatarUrl: 'https://randomuser.me/api/portraits/women/82.jpg',
        info: '2号咖啡机损坏',
      },
      {
        avatarUrl: 'https://randomuser.me/api/portraits/women/40.jpg',
        info: '3号饮水机损坏',
      },
      {
        avatarUrl: 'https://randomuser.me/api/portraits/men/19.jpg',
        info: '4号饮水机损坏',
      },
      {
        avatarUrl: 'https://randomuser.me/api/portraits/women/40.jpg',
        info: '5号饮水机损坏',
      },
    ],
  });
};

export default {
  'GET /api/ticketList': getTicketList,
  'GET /api/nearestTicketList': getNearestTicketList,
};
