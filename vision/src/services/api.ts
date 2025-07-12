import axios from 'axios';
import { ApiErrorResponse, Customer, DeleteCustomerResponse, DeleteExpenseResponse, DeleteRoomResponse, Expense, GetAllExpensesResponse, GetAllRoomsResponse, GetAvailableRoomsResponse, Room, SingleCustomerResponse, SingleExpenseResponse, SingleRoomResponse } from '../interfaces/interface';

const BASE_URL = 'https://bj-hotel-api.onrender.com';

const api = axios.create({
  baseURL: BASE_URL,
  // You can set default headers here if needed
  // headers: { 'Authorization': `Bearer ${token}` }
});

export const login = async (credentials: { email: string; password: string }) => {
  const response = await api.post<LoginSuccessResponse | ApiErrorResponse>(
    '/api/v1/auth/signin', 
    credentials
  );
  return response.data; 
};

export const signup = async (credentials: { email: string; password: string }) => {
  const response = await api.post<SignupSuccessResponse | ApiErrorResponse>(
    '/api/v1/auth/signup', 
    credentials
  );
  return response.data; 
};

export const logout = () => api.post('/api/v1/auth/logout');


export const getAllMatches = async () => {
  const response = await api.get<GetAllMatchesResponse | ApiErrorResponse>('/matches/all');
  return response.data;
};

export const getLiveMatches = async () => {
  const response = await api.get<GetAllMatchesResponse | ApiErrorResponse>('/matches/live');
  return response.data;
};


export const getMatchById = async (id: string) => {
  const response = await api.get<SingleMatchResponse | ApiErrorResponse>(`/matches/${id}`);
  return response.data;
};


export const uploadBooking = async (data: Partial<Booking>) => {
  const response = await api.post<UploadBookingResponse  | ApiErrorResponse>('/bookings', data);
  return response.data;
};

export const getAllBookings = async () => {
  const response = await api.get<GetAllBookingsResponse | ApiErrorResponse>('/bookings/all');
  return response.data;
};

export const getRunningBookings = async () => {
  const response = await api.get<GetRunningBookingsResponse | ApiErrorResponse>('/bookings/running');
  return response.data;
};

export const getBookingById = async (id: string) => {
  const response = await api.get<SingleBookingResponse | ApiErrorResponse>(`/bookings/${id}`);
  return response.data;
};


export default api;