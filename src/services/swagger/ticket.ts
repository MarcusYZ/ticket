// @ts-ignore
/* eslint-disable */
import { TICKET } from '@/pages/tickets/typings';
import { request } from 'umi';

/** Create user This can only be done by the logged in user. POST /user */
export async function getTicketList(body: TICKET.TicketParams, options?: { [key: string]: any }) {
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
  return request<TICKET.TicketForm>('/api/addTicket', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function deleteTicket(body: { id: number }, options?: { [key: string]: any }) {
  return request<TICKET.TicketForm>('/api/deleteTicket', {
    method: 'DELETE',
    data: body,
    ...(options || {}),
  });
}
