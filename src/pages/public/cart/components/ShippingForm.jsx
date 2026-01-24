import React, { useEffect, useState, useCallback } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { indianStates } from "./data";
import { useFormContext } from "react-hook-form";
import axiosInstance from "../../../../utils/apiConnector";

const EMPTY_ADDRESS = {
    street: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
};

const ShippingForm = ({ addresses, setAddresses }) => {
    const [selectedAddressId, setSelectedAddressId] = useState("new");

    const methods = useFormContext();

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const { data } = await axiosInstance.get(
                    "/user/address/getAll"
                );
                setAddresses(data?.addresses || []);
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
        };
        fetchAddresses();
    }, []);

    useEffect(() => {
        methods.setValue("addressId", selectedAddressId);
    }, [selectedAddressId, methods]);

    const handleAddressSelect = useCallback(
        (e) => {
            const selectedId = e.target.value;
            setSelectedAddressId(selectedId);

            if (selectedId === "new") {
                methods.reset(EMPTY_ADDRESS);
                methods.setFocus("street");
                return;
            }

            const selected = addresses.find((addr) => addr._id === selectedId);
            if (!selected) {
                console.warn("Selected address not found");
                return;
            }

            methods.setValue("street", selected.street);
            methods.setValue("city", selected.city);
            methods.setValue("state", selected.state);
            methods.setValue("postalCode", selected.postalCode);
            methods.setValue("phone", selected.phone);
        },
        [addresses, methods]
    );

    return (
        <div className="mb-8">
            <h2 className="text-lg font-semibold uppercase text-foreground mb-4">
                Shipping Information
            </h2>

            {addresses.length > 0 && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Saved Address
                    </label>
                    <select
                        value={selectedAddressId}
                        onChange={handleAddressSelect}
                        defaultValue="new"
                        className="w-full p-3 py-4 border-[2px] border-foreground/50 focus:outline-none focus:border-foreground text-foreground transition-all duration-100 ease-linear bg-white"
                    >
                        <option value="new" disabled hidden>
                            Select an address or add new
                        </option>
                        {addresses.map((addr) => (
                            <option key={addr._id} value={addr._id}>
                                {`${addr.street}, ${addr.city}, ${addr.state}`}
                            </option>
                        ))}
                        <option value="new">Add New Address</option>
                    </select>
                </div>
            )}

            <input type="hidden" {...methods.register("addressId")} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    label="Street Address"
                    name="street"
                    rules={{
                        required: "Street address is required",
                        minLength: {
                            value: 5,
                            message: "Minimum 5 characters",
                        },
                    }}
                />

                <InputField
                    label="City"
                    name="city"
                    rules={{
                        required: "City is required",
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Letters & spaces only",
                        },
                    }}
                />

                <SelectField
                    label="State"
                    name="state"
                    options={indianStates}
                    rules={{ required: "State is required" }}
                />

                <InputField
                    label="Postal Code"
                    name="postalCode"
                    rules={{
                        required: "Postal code is required",
                        pattern: {
                            value: /^\d{6}$/,
                            message: "6 digits required",
                        },
                    }}
                />

                <div className="sm:col-span-2">
                    <InputField
                        label="Phone"
                        name="phone"
                        type="tel"
                        rules={{
                            required: "Phone number is required",
                            pattern: {
                                value: /^\d{10}$/,
                                message: "10 digits required",
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ShippingForm;
