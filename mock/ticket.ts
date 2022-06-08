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

let ticketList = [
  {
    id: 1,
    avatarUrl: 'https://randomuser.me/api/portraits/men/19.jpg',
    info: '1号咖啡机损坏',
    status: '待运维处理',
    priority: ListType.DANGER,
    date: '2021-04-08 01:18',
    time: '逾期 3 天 22 小时 44分',
  },
  {
    id: 2,
    avatarUrl: 'https://randomuser.me/api/portraits/women/82.jpg',
    info: '2号咖啡机损坏',
    status: '待运维处理',
    priority: ListType.WARN,
    date: '2021-04-08 01:18',
    time: '逾期 3 天 22 小时 44分',
  },
  {
    id: 3,
    avatarUrl: 'https://randomuser.me/api/portraits/women/40.jpg',
    info: '3号饮水机损坏',
    status: '待运维处理',
    priority: ListType.COMMON,
    date: '2021-04-08 01:18',
    time: '逾期 3 天 22 小时 44分',
  },
  {
    id: 4,
    avatarUrl: 'https://randomuser.me/api/portraits/women/40.jpg',
    info: '4号饮水机损坏',
    status: '待运维补充材料',
    priority: ListType.NORMAL,
    date: '2021-04-08 01:18',
    time: '逾期 3 天 22 小时 44分',
  },
];

const getTicketList = async (req: Request, res: Response) => {
  await waitTime(1000);
  res.json({
    data: ticketList,
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

// 添加工单
const addTicket = async (req: Request, res: Response) => {
  await waitTime(1000);
  ticketList.push(req.body);
  res.send({
    status: 'ok',
    data: {},
  });
};

// 找到对应的项更新数据
const modifyTicket = async (req: Request, res: Response) => {
  console.log(req.body, 'req');
};

// 找到对应的项进行删除
const deleteTicket = async (req: Request, res: Response) => {
  await waitTime(1000);
  const { id } = req.body;
  ticketList = ticketList.filter((item) => item.id !== id);
  res.send({
    status: 'ok',
    data: ticketList,
  });
};

// 删除工单
export default {
  'GET /api/ticketList': getTicketList,
  'GET /api/nearestTicketList': getNearestTicketList,
  'POST /api/addTicket': addTicket,
  'POST /api/modify': modifyTicket,
  'DELETE /api/deleteTicket': deleteTicket,
};
