import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import env from "../config/env.config";

const baseURL = env.VITE_API_BASE_URL;
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// Ensure T is the type of data you expect from the API response
type ApiFunction<T> = (...args: any[]) => Promise<AxiosResponse<T>>;

function withErrorHandling<T>(
  apiFunction: ApiFunction<T>
): (...args: any[]) => Promise<T> {
  return async (...args: any[]): Promise<T> => {
    try {
      const response = await apiFunction(...args);
      return response.data; // Return only the data part of the response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        let message = "An unexpected error occurred";
        let status = 0;
        let data: any = null;

        if (axiosError.response) {
          // Error response from server
          status = axiosError.response.status;
          data = axiosError.response.data;
          switch (status) {
            case 400:
              message = "Bad Request: Please check your input.";
              break;
            case 401:
              message = "Unauthorized: Please log in.";
              break;
            case 403:
              message = "Forbidden: You do not have permission.";
              break;
            case 404:
              message = "Not Found: The requested resource could not be found.";
              break;
            case 500:
              message =
                "Internal Server Error: Something went wrong on the server.";
              break;
            default:
              message;
          }
          throw new ApiError(message, status, data);
        } else if (axiosError.request) {
          // No response from server
          message = "No response received from server. Please try again later.";
          throw new ApiError(message, status);
        } else {
          // Error in setting up the request
          message = axiosError.message;
          throw new ApiError(message, status);
        }
      }
      throw error; // Re-throw if it's not an Axios error
    }
  };
}

class Http {
  private static instance: Http;

  private constructor() {}

  public static getInstance(): Http {
    if (!Http.instance) {
      Http.instance = new Http();
    }
    return Http.instance;
  }

  public get<T>(url: string, params?: any): Promise<T> {
    return withErrorHandling((url: string, params?: any) =>
      axiosInstance.get<T>(url, { params })
    )(url, params);
  }

  public post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return withErrorHandling(
      (url: string, data?: any, config?: AxiosRequestConfig) =>
        axiosInstance.post<T>(url, data, config)
    )(url, data, config);
  }

  public patch<T>(url: string, data?: any): Promise<T> {
    return withErrorHandling((url: string, data?: any) =>
      axiosInstance.patch<T>(url, data)
    )(url, data);
  }

  public delete<T>(url: string): Promise<T> {
    return withErrorHandling((url: string) => axiosInstance.delete<T>(url))(
      url
    );
  }
}

export default Http.getInstance();
