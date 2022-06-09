import { Request, Response } from 'express';

enum QuestionType {
  HOLIDAY = 'holiday',
}

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
    question: '1号咖啡机损坏',
    status: '待运维处理',
    priority: ListType.DANGER,
    date: '2021-04-08 01:18',
    time: '逾期 3 天 22 小时 44分',
    detail: '详细信息',
    questionSort: QuestionType.HOLIDAY,
    expirationTime: new Date(),
    staff: 'Gates',
    team: '北京石景山万达店',
    enclosure: [],
  },
  {
    id: 2,
    avatarUrl: 'https://randomuser.me/api/portraits/women/82.jpg',
    question: '2号咖啡机损坏',
    status: '待运维处理',
    priority: ListType.WARN,
    date: '2021-04-08 01:18',
    time: '逾期 3 天 22 小时 44分',
    detail: '详细信息',
    questionSort: QuestionType.HOLIDAY,
    expirationTime: new Date(),
    staff: 'Gates',
    team: '北京石景山万达店',
    enclosure: [],
  },
  {
    id: 3,
    avatarUrl: 'https://randomuser.me/api/portraits/women/40.jpg',
    question: '3号饮水机损坏',
    status: '待运维处理',
    priority: ListType.COMMON,
    date: '2021-04-08 01:18',
    time: '逾期 3 天 22 小时 44分',
    detail: '详细信息',
    questionSort: QuestionType.HOLIDAY,
    expirationTime: new Date(),
    staff: 'Gates',
    team: '北京石景山万达店',
    enclosure: [],
  },
  {
    id: 4,
    avatarUrl: 'https://randomuser.me/api/portraits/women/40.jpg',
    question: '4号饮水机损坏',
    status: '待运维补充材料',
    priority: ListType.NORMAL,
    date: '2021-04-08 01:18',
    time: '逾期 3 天 22 小时 44分',
    detail: '详细信息',
    questionSort: QuestionType.HOLIDAY,
    expirationTime: new Date(),
    staff: 'Gates',
    team: '北京石景山万达店',
    enclosure: [],
  },
];

const getTicketList = async (req: Request, res: Response) => {
  await waitTime(1000);
  console.log(req.body, 'body');
  res.json({
    data: {
      ticketList,
      type: req.body,
    },
  });
};

const getNearestTicketList = (req: Request, res: Response) => {
  res.json({
    data: [
      {
        avatarUrl: 'https://randomuser.me/api/portraits/men/19.jpg',
        question: '1号咖啡机损坏',
      },
      {
        avatarUrl: 'https://randomuser.me/api/portraits/women/82.jpg',
        question: '2号咖啡机损坏',
      },
      {
        avatarUrl: 'https://randomuser.me/api/portraits/women/40.jpg',
        question: '3号饮水机损坏',
      },
      {
        avatarUrl: 'https://randomuser.me/api/portraits/men/19.jpg',
        question: '4号饮水机损坏',
      },
      {
        avatarUrl: 'https://randomuser.me/api/portraits/women/40.jpg',
        question: '5号饮水机损坏',
      },
    ],
  });
};

const defaultTicketInfo = {
  id: 4,
  avatarUrl: 'https://randomuser.me/api/portraits/women/40.jpg',
  question: '4号饮水机损坏',
  status: '待运维补充材料',
  priority: ListType.NORMAL,
  date: '2021-04-08 01:18',
  time: '逾期 3 天 22 小时 44分',
  detail: '详细信息',
  questionSort: QuestionType.HOLIDAY,
  expirationTime: new Date(),
  staff: 'Gates',
  team: '北京石景山万达店',
  enclosure: [],
};

// 添加工单
const addTicket = async (req: Request, res: Response) => {
  const id = ticketList.length + 1;
  await waitTime(1000);
  ticketList.push({
    ...defaultTicketInfo,
    ...req.body,
    id,
  });
  res.send({
    status: 'ok',
    data: ticketList,
  });
};

// 找到对应的项更新数据
const modifyTicket = async (req: Request, res: Response) => {
  await waitTime(1000);
  const { id } = req.body;
  ticketList = ticketList.map((item) => {
    if (item.id === id) {
      return { ...item, ...req.body };
    }
    return item;
  });
  res.send({
    status: 'ok',
    data: ticketList,
  });
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

export default {
  'POST /api/ticketList': getTicketList, // 获取列表
  'GET /api/nearestTicketList': getNearestTicketList, // 近期工单
  'POST /api/addTicket': addTicket, // 添加
  'POST /api/modifyTicket': modifyTicket, // 编辑
  'DELETE /api/deleteTicket': deleteTicket, //删除
};
