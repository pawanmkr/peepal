import axios, { isAxiosError } from "axios";
import { User } from "./user";

type Reviewer = Pick<
    User,
    "id" | "username" | "firstName" | "lastName" | "avatar"
>;
export interface Review {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    user: Reviewer;
}
export interface AddReview {
    rating: number;
    comment: string;
    userId: string;
    professionalId: string;
}
const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function addReview(
    r: AddReview
): Promise<[Review | null, string | null]> {
    const { rating, comment, userId, professionalId } = r;
    try {
        const res = await axios.post(`${API_URL}/review`, {
            rating,
            comment,
            userId,
            professionalId,
        });
        return [res.data, null];
    } catch (error) {
        if (isAxiosError(error) && error.response?.status === 400) {
            return [null, "Invalid input"];
        }
        return [null, "Something went wrong. Please try again later."];
    }
}

export async function getReviewsByProfessional(
    professionalId: string,
    offset: number,
    limit: number
): Promise<[{ reviews: Review[]; total: number } | null, string | null]> {
    try {
        const { data } = await axios.get(
            `${API_URL}/review/professional/${professionalId}`,
            {
                params: {
                    offset,
                    limit,
                },
            }
        );
        return [data, null];
    } catch (error) {
        if (isAxiosError(error) && error.response?.status === 400) {
            return [null, "Invalid input"];
        }
        return [null, "Something went wrong. Please try again later."];
    }
}

export async function getReviewsByUser(userId: string): Promise<Review[]> {
    try {
        const { data } = await axios.get(`${API_URL}/review/user/${userId}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response?.status === 400) return [];
        return [];
    }
}

export async function deleteReview(id: string): Promise<boolean> {
    try {
        await axios.delete(`${API_URL}/review/${id}`);
        return true;
    } catch (error) {
        if (isAxiosError(error) && error.response?.status === 404) return false;
        return false;
    }
}
