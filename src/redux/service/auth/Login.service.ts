import apiClient from "../../apiClient";
import axios from "axios";

// Define the payload and response types for Login
export interface LoginPayload {
  userId: string;
  password?: string;
}

export interface LoginResponse {
  token: string;
  user?: {
    userId: string;
    name?: string;
    role?: string;
    // Add other user fields if returned by API
  };
  message: string;
}

const extractServerMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? error.message ?? "Login failed";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Login failed";
};

export const loginUser = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post("/auth/login", payload);

    // The API returns: { status, message, data: { token, user } }
    // We need to extract from the nested data object
    const { data, message } = response.data;

    if (!data?.token) {
      throw new Error("No authentication token received");
    }

    return {
      token: data.token,
      user: data.user,
      message: message || "Login successful",
    };
  } catch (error) {
    throw new Error(extractServerMessage(error));
  }
};
