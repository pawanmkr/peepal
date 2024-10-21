import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import {
    CreateProfessional,
    Professional,
    professionalApi,
    ProfessionalChargeType,
} from "../../../api/professional";
import { getLoggedInUser } from "../../../utils/user";
import { UserRole } from "../../../api/user";
import { refreshToken } from "../../../api/auth";

// Main ProfessionalProfileForm Component
export const ProfessionalProfileForm = () => {
    const [pro, setPro] = useState<Professional | null>(null);
    const [formData, setFormData] = useState<CreateProfessional>({
        description: "",
        experience: 0,
        skills: "",
        video: "",
        location: "",
        languages: "",
        currency: "",
        charge: 0,
        chargeType: ProfessionalChargeType.Hourly,
        formalEducation: [
            {
                qualification: "",
                institution: "",
                year: new Date().getFullYear(),
                subjects: "",
            },
        ],
    });

    const [avatarPreview, setAvatarPreview] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Fetch existing professional data if available
    useEffect(() => {
        const fetch = async () => {
            const user = getLoggedInUser();
            if (!user) {
                setError("User not found. Please login again.");
                return;
            }
            if (user.role === UserRole.PROFESSIONAL) {
                const pro = await professionalApi.getProfessionalById(user.id);
                setPro(pro);
                setFormData({
                    description: pro.description,
                    experience: pro.experience,
                    skills: pro.skills,
                    video: pro.video,
                    location: pro.location,
                    languages: pro.languages,
                    currency: pro.currency,
                    charge: pro.charge,
                    chargeType: pro.chargeType,
                    formalEducation: pro.formalEducation,
                });
                setAvatarPreview(pro.user.avatar);
            }
        };
        fetch();
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormalEducationChange = (
        index: number,
        field: string,
        value: string | number
    ) => {
        const updatedEducation = [...formData.formalEducation];
        updatedEducation[index] = {
            ...updatedEducation[index],
            [field]: value,
        };
        setFormData((prev) => ({ ...prev, formalEducation: updatedEducation }));
    };

    const addFormalEducation = () => {
        setFormData((prev) => ({
            ...prev,
            formalEducation: [
                ...prev.formalEducation,
                {
                    qualification: "",
                    institution: "",
                    year: new Date().getFullYear(),
                    subjects: "",
                },
            ],
        }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        const user = getLoggedInUser();
        if (!user) {
            setError("User not found. Please login again.");
            setIsLoading(false);
            return;
        }
        try {
            const professional = await professionalApi.createProfessional(
                user.id,
                formData
            );
            console.log(professional);
            await refreshToken();
            navigate("/professional/" + professional.id);
        } catch (err) {
            setError("Failed to submit the form. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg px-6 py-3 max-w-3xl mx-auto mb-16">
            {isLoading && (
                <div className="flex items-center justify-center">
                    <Loader className="animate-spin" size={24} />
                </div>
            )}

            {error && <p className="text-red-500">{error}</p>}

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-4 pb-2"
            >
                {/* Basic Info Component */}
                <BasicInfo
                    formData={formData}
                    handleInputChange={handleInputChange}
                    avatarPreview={avatarPreview}
                    handleAvatarChange={handleAvatarChange}
                    handleRemoveAvatar={() => setAvatarPreview(undefined)}
                />

                {/* Formal Education Component */}
                <FormalEducation
                    formData={formData}
                    handleFormalEducationChange={handleFormalEducationChange}
                    addFormalEducation={addFormalEducation}
                    removeFormalEducation={(index) => {
                        const updatedEducation =
                            formData.formalEducation.filter(
                                (_, i) => i !== index
                            );
                        setFormData((prev) => ({
                            ...prev,
                            formalEducation: updatedEducation,
                        }));
                    }}
                />

                <button
                    type="submit"
                    className="mt-2 bg-blue-500 text-white px-8 py-2 rounded-lg w-max"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

interface BasicInfoProps {
    formData: CreateProfessional;
    handleInputChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => void;
    avatarPreview: string | undefined;
    handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveAvatar: () => void;
}

// BasicInfo Component: Includes Avatar, Description, Video URL, Location, Languages, Charge, and Currency
const BasicInfo = ({
    formData,
    handleInputChange,
    avatarPreview,
    handleAvatarChange,
    handleRemoveAvatar,
}: BasicInfoProps) => {
    return (
        <>
            <h3>Basic Information</h3>
            <div className="">
                {/* Avatar */}
                <div className="">
                    {/* Avatar label */}
                    {/* <label
                        htmlFor="avatar"
                        className="block text-sm font-semibold mb-2"
                    >
                        Avatar
                    </label> */}

                    <div className="flex items-center gap-x-8 mb-4">
                        {/* Avatar preview */}
                        <div className="relative w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                            {/* Hidden file input */}
                            <input
                                type="file"
                                name="avatar"
                                id="avatar"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                style={{ display: "none" }}
                            />

                            {/* Display the image or default placeholder */}
                            <img
                                src={avatarPreview}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>

                        {/* Action buttons: Upload/Reupload and Remove */}
                        <div className="flex gap-x-4">
                            <button
                                type="button"
                                className="underline"
                                onClick={() =>
                                    document.getElementById("avatar")?.click()
                                }
                            >
                                {avatarPreview ? "Reupload" : "Upload"}
                            </button>

                            <button
                                type="button"
                                className="underline"
                                onClick={handleRemoveAvatar}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-sm font-semibold mb-1"
                    >
                        Description<span className="text-red-600">* </span>
                        <span className="font-normal">
                            (Max 5000 characters)
                        </span>
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        required
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={8}
                        className="w-full p-2 border border-gray-300 rounded-lg resize-none"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="video"
                        className="block text-sm font-semibold mb-1"
                    >
                        Video URL
                        <span className="font-normal">
                            (Only YouTube embedded link supported yet)
                        </span>
                    </label>
                    <input
                        type="url"
                        name="video"
                        id="video"
                        value={formData.video}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="languages"
                        className="block text-sm font-semibold mb-1"
                    >
                        Languages
                    </label>
                    <input
                        type="text"
                        name="languages"
                        id="languages"
                        placeholder="e.g., English, Spanish, French"
                        value={formData.languages}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label
                            htmlFor="skills"
                            className="block text-sm font-semibold mb-1"
                        >
                            Skills
                            <span className="font-normal">
                                {" "}
                                (comma seperated)
                            </span>
                        </label>
                        <textarea
                            name="skills"
                            id="skills"
                            placeholder="e.g., Corporate Finance, Financial Modeling"
                            value={formData.skills}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg resize-none"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-10 gap-x-8">
                    {/* Location Field (40% width) */}
                    <div className="col-span-4 mb-4">
                        <label
                            htmlFor="location"
                            className="block text-sm font-semibold mb-1"
                        >
                            Location
                            <span className="font-normal"> (City/Country)</span>
                        </label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    {/* Charge Field (30% width) */}
                    <div className="col-span-3 mb-4">
                        <label
                            htmlFor="charge"
                            className="block text-sm font-semibold mb-1"
                        >
                            Charge
                        </label>
                        <input
                            type="number"
                            name="charge"
                            id="charge"
                            value={formData.charge}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    {/* Currency Field (30% width) */}
                    <div className="col-span-3 mb-4">
                        <label
                            htmlFor="currency"
                            className="block text-sm font-semibold mb-1"
                        >
                            Currency
                        </label>
                        <input
                            type="text"
                            name="currency"
                            id="currency"
                            value={formData.currency}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                            defaultValue={"INR"}
                            placeholder="INR"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

interface FormalEducationProps {
    formData: CreateProfessional;
    handleFormalEducationChange: (
        index: number,
        field: string,
        value: string | number
    ) => void;
    addFormalEducation: () => void;
    removeFormalEducation: (index: number) => void;
}

// Formal Education Component
const FormalEducation = ({
    formData,
    handleFormalEducationChange,
    addFormalEducation,
    removeFormalEducation,
}: FormalEducationProps) => {
    return (
        <>
            <h3 className="mb-2">Formal Education</h3>
            {formData.formalEducation.map((education, index) => (
                <div
                    key={index}
                    className="grid grid-cols-1 gap-4 border border-gray-300 p-3 rounded-lg bg-gray-50"
                >
                    <div>
                        <label
                            htmlFor={`qualification-${index}`}
                            className="block text-sm font-semibold mb-1"
                        >
                            Qualification
                            <span className="font-normal">
                                {" "}
                                (Course/Degree)
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., B.Tech, Law"
                            name={`qualification-${index}`}
                            id={`qualification-${index}`}
                            value={education.qualification}
                            onChange={(e) =>
                                handleFormalEducationChange(
                                    index,
                                    "qualification",
                                    e.target.value
                                )
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-10 gap-x-8">
                        <div className="col-span-7">
                            <label
                                htmlFor={`institution-${index}`}
                                className="block text-sm font-semibold mb-1"
                            >
                                Institution
                            </label>
                            <input
                                type="text"
                                name={`institution-${index}`}
                                id={`institution-${index}`}
                                value={education.institution}
                                onChange={(e) =>
                                    handleFormalEducationChange(
                                        index,
                                        "institution",
                                        e.target.value
                                    )
                                }
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>

                        <div className="col-span-3">
                            <label
                                htmlFor={`year-${index}`}
                                className="block text-sm font-semibold mb-1"
                            >
                                Year
                            </label>
                            <input
                                type="number"
                                name={`year-${index}`}
                                id={`year-${index}`}
                                value={education.year}
                                onChange={(e) =>
                                    handleFormalEducationChange(
                                        index,
                                        "year",
                                        parseInt(e.target.value)
                                    )
                                }
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor={`subjects-${index}`}
                            className="block text-sm font-semibold mb-1"
                        >
                            Subjects
                            <span className="font-normal">
                                {" "}
                                (comma seperated)
                            </span>
                        </label>
                        <input
                            name={`subjects-${index}`}
                            id={`subjects-${index}`}
                            placeholder="e.g., Computer Science, Mathematics"
                            value={education.subjects}
                            onChange={(e) =>
                                handleFormalEducationChange(
                                    index,
                                    "subjects",
                                    e.target.value
                                )
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => removeFormalEducation(index)}
                        className="text-red-500 text-start ml-1"
                    >
                        Remove
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={addFormalEducation}
                className="text-blue-500 text-start ml-1"
            >
                Add Another Education
            </button>
        </>
    );
};
