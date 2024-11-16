/* import http from "./http";

// Session Interfaces
interface CreateSessionDto {
  name: string;
  description: string;
  cost: number;
  duration: number;
  rule: string;
}

interface UpdateSessionDto {
  name?: string;
  description?: string;
}

// Query Parameter Interfaces
interface PaginationParams {
  offset: number;
  limit: number;
}

interface SessionQueryParams {
  userId?: string;
  userId?: string;
}

// Path Parameter Interfaces
interface IdParam {
  id: string;
}

export const sessionApi = {
  createSession: (data: CreateSessionDto): Promise<Session> => {
    return http.post<Session>("/api/v1/session", data);
  },

  getAllSessions: (
    params: PaginationParams & SessionQueryParams
  ): Promise<Session[]> => {
    return http.get<Session[]>("/api/v1/session", params);
  },

  getSessionById: (params: IdParam): Promise<Session> => {
    return http.get<Session>(`/api/v1/session/${params.id}`);
  },

  updateSession: (
    params: IdParam,
    data: UpdateSessionDto
  ): Promise<Session> => {
    return http.patch<Session>(`/api/v1/session/${params.id}`, data);
  },

  deleteSession: (params: IdParam): Promise<void> => {
    return http.delete<void>(`/api/v1/session/${params.id}`);
  },
};
 */
