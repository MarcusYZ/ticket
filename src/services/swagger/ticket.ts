// @ts-ignore
/* eslint-disable */
import { TICKET } from '@/pages/tickets/typings';
import { request } from 'umi';

// 获取工单列表
export async function getTicketList(body: TICKET.TicketParams, options?: { [key: string]: any }) {
  return request<any>('/api/ticketList', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// 获取近期工单
export async function getNearestTicketList(body: API.User, options?: { [key: string]: any }) {
  return request<any>('/api/nearestTicketList', {
    method: 'GET',
    data: body,
    ...(options || {}),
  });
}

// 添加工单
export async function addTicket(body: any, options?: { [key: string]: any }) {
  return request<TICKET.TicketForm>('/api/addTicket', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

// 删除工单
export async function deleteTicket(body: { id: number }, options?: { [key: string]: any }) {
  return request<TICKET.TicketForm>('/api/deleteTicket', {
    method: 'DELETE',
    data: body,
    ...(options || {}),
  });
}

// 修改工单
export async function modifyTicket(body: any, options?: { [key: string]: any }) {
  return request<TICKET.TicketForm>('/api/modifyTicket', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
