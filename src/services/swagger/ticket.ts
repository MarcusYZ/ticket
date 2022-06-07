// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Create user This can only be done by the logged in user. POST /user */
export async function getTicketList(body: API.User, options?: { [key: string]: any }) {
  return request<any>('/api/ticketList', {
    method: 'GET',
    data: body,
    ...(options || {}),
  });
}

export async function getNearestTicketList(body: API.User, options?: { [key: string]: any }) {
  return request<any>('/api/nearestTicketList', {
    method: 'GET',
    data: body,
    ...(options || {}),
  });
}

export async function addTicket(body: any, options?: { [key: string]: any }) {
  return request<any>('/api/addTicket', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
