import apiClient from "../../apiClient";
import axios from "axios";

export interface CreateTestPayload {
  name: string;
  type: string;
  subject: string;
  topics: string[];
  sub_topics: string[];
  correct_marks: number;
  wrong_marks: number;
  unattempt_marks: number;
  difficulty: "easy" | "medium" | "hard";
  total_time: number;
  total_questions: number;
  total_marks: number;
  status: string | null;
}

export interface CreateTestResponse {
  status: string;
  message: string;
  data: unknown;
}

const extractServerMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? error.message ?? "Request failed";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Request failed";
};

export const createTest = async (
  payload: CreateTestPayload,
): Promise<CreateTestResponse> => {
  try {
    const response = await apiClient.post("/tests", payload);
    return response.data;
  } catch (error) {
    throw new Error(extractServerMessage(error));
  }
};

export interface Question {
  type: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correct_option: string;
  explanation?: string;
  difficulty?: string;
  test_id: string;
  topic_id?: string;
  sub_topic_id?: string;
  media_url?: string;
}

export interface BulkCreateQuestionsPayload {
  questions: Question[];
}

export const bulkCreateQuestions = async (
  payload: BulkCreateQuestionsPayload,
): Promise<{ success: boolean; data: unknown; message: string }> => {
  try {
    const response = await apiClient.post("/questions/bulk", payload);
    return response.data;
  } catch (error) {
    throw new Error(extractServerMessage(error));
  }
};

export interface GetAllTestsParams {
  search?: string;
  subject?: string;
}

export const getAllTests = async (
  params?: GetAllTestsParams,
): Promise<unknown> => {
  try {
    // Filter out empty, null, or undefined parameters
    const cleanParams: Record<string, string> = {};
    if (params) {
      Object.keys(params).forEach((key) => {
        const value = params[key as keyof GetAllTestsParams];
        if (value && value.trim && value.trim() !== "") {
          cleanParams[key] = value.trim();
        }
      });
    }

    // Only pass params if there are actual values
    const config =
      Object.keys(cleanParams).length > 0 ? { params: cleanParams } : {};
    const response = await apiClient.get("/tests", config);
    return response.data;
  } catch (error) {
    throw new Error(extractServerMessage(error));
  }
};

export const getTestById = async (id: string): Promise<unknown> => {
  try {
    const response = await apiClient.get(`/tests/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(extractServerMessage(error));
  }
};


export interface UpdateTestPayload {
  name?: string;
  type?: string;
  subject?: string;
  topics?: string[];
  sub_topics?: string[];
  correct_marks?: number;
  wrong_marks?: number;
  unattempt_marks?: number;
  difficulty?: "easy" | "medium" | "hard";
  total_time?: number;
  total_questions?: number;
  total_marks?: number;
  status?: string;
  scheduled_date?: string | null;
  expiry_date?: string | null;
}

export const updateTest = async (
  id: string,
  payload: UpdateTestPayload,
): Promise<{ success: boolean; data: unknown; message: string }> => {
  try {
    const response = await apiClient.put(`/tests/${id}`, payload);
    return response.data;
  } catch (error) {
    throw new Error(extractServerMessage(error));
  }
};
