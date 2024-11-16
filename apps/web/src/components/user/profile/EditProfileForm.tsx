import React, { useEffect, useState } from "react";
import { UpdateUserDto, User, ChargeType, userApi } from "../../../api/user";
import { getLoggedInUser } from "../../../utils/user";

const EditProfileForm = () => {
    let CURRENT_USER = getLoggedInUser();

    const [user, setUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<Partial<UpdateUserDto>>({
        ...user,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await userApi.getUserById(CURRENT_USER.id);
            setUser(fetchedUser);
            setFormData({
                firstName: fetchedUser.firstName,
                lastName: fetchedUser.lastName,
                email: fetchedUser.email,
                description: fetchedUser.description,
                skills: fetchedUser.skills,
                location: fetchedUser.location,
                languages: fetchedUser.languages,
                charge: fetchedUser.charge,
                chargeType: fetchedUser.chargeType,
            });
        };
        fetchUser();
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors(null);
        setLoading(true);

        try {
            // Validation for password requirements
            if (formData.newPassword || formData.currentPassword) {
                // If only one of the passwords is provided
                if (!formData.newPassword || !formData.currentPassword) {
                    setErrors(
                        "Both current password and new password are required to update your password."
                    );
                    setLoading(false);
                    return;
                }

                // If both passwords match
                if (formData.newPassword === formData.currentPassword) {
                    setErrors(
                        "New password cannot be the same as the current password."
                    );
                    setLoading(false);
                    return;
                }

                // Additional password strength validation (optional)
                if (formData.newPassword.length < 8) {
                    setErrors(
                        "New password must be at least 8 characters long."
                    );
                    setLoading(false);
                    return;
                }
            }

            // Ensure charge is a number (if it's not already)
            if (formData.charge) {
                formData.charge = parseFloat(formData.charge.toString());
            }
            if (formData.chargeType) {
                formData.chargeType =
                    formData.chargeType.toLowerCase() as ChargeType;
            }

            // Convert comma-separated strings into arrays for skills and languages
            if (formData.skills) {
                formData.skills = formData.skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .toString();
            }
            if (formData.languages) {
                formData.languages = formData.languages
                    .split(",")
                    .map((language) => language.trim())
                    .toString();
            }

            // Remove null, undefined, or empty string values from formData
            const cleanedFormData = Object.fromEntries(
                Object.entries(formData).filter(
                    ([_, value]) =>
                        value !== null && value !== undefined && value !== ""
                )
            );

            const updatedUser = await userApi.updateUser(
                CURRENT_USER.id,
                cleanedFormData
            );
            setUser(updatedUser);
        } catch (error) {
            console.error("Error updating profile:", error);
            setErrors(
                "An error occurred while updating your profile. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto bg-white rounded-lg overflow-hidden border shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-semibold">Edit Profile</h2>
                    <button
                        type="submit"
                        className="py-2 w-48 bg-blue-500 hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Save Changes"}
                    </button>
                </div>
                {errors && <div className="text-red-500 text-sm">{errors}</div>}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Left Column */}
                    <div className="space-y-4 md:col-span-1">
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName || ""}
                                onChange={handleInputChange}
                                className="bg-slate-100 mt-1 block w-full px-2 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="lastName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName || ""}
                                onChange={handleInputChange}
                                className="bg-slate-100 mt-1 block w-full px-2 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="charge"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Charge
                            </label>
                            <input
                                type="number"
                                id="charge"
                                name="charge"
                                value={formData.charge || ""}
                                onChange={handleInputChange}
                                className="bg-slate-100 mt-1 block w-full px-2 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="chargeType"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Charge Type
                            </label>
                            <select
                                id="chargeType"
                                name="chargeType"
                                value={formData.chargeType || ""}
                                onChange={handleSelectChange}
                                className="bg-slate-100 mt-1 block w-full px-2 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="" disabled>
                                    Select a Charge Type
                                </option>
                                {Object.keys(ChargeType).map((key) => (
                                    <option key={key} value={key}>
                                        {
                                            ChargeType[
                                                key as keyof typeof ChargeType
                                            ]
                                        }
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleInputChange}
                                className="bg-slate-100 mt-1 block w-full px-2 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="currentPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Current Password
                            </label>
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                onChange={handleInputChange}
                                className="bg-slate-100 mt-1 block w-full px-2 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="newPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                onChange={handleInputChange}
                                className="bg-slate-100 mt-1 block w-full px-2 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4 md:col-span-2">
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description || ""}
                                onChange={handleInputChange}
                                className="bg-slate-100 mt-1 block w-full px-2 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                rows={6}
                            ></textarea>
                        </div>
                        <div>
                            <label
                                htmlFor="skills"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Skills{" "}
                                <span className="text-gray-400">
                                    (comma-separated)
                                </span>
                            </label>
                            <input
                                id="skills"
                                name="skills"
                                value={formData.skills || ""}
                                onChange={handleInputChange}
                                className="bg-slate-100 mt-1 block w-full px-2 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="location"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location || ""}
                                onChange={handleInputChange}
                                className="bg-slate-100 mt-1 block w-full px-2 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="languages"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Languages{" "}
                                <span className="text-gray-400">
                                    (comma-separated)
                                </span>
                            </label>
                            <input
                                type="text"
                                id="languages"
                                name="languages"
                                value={formData.languages || ""}
                                onChange={handleInputChange}
                                className="bg-slate-100 mt-1 block w-full px-2 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditProfileForm;
