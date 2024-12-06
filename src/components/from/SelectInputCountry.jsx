import React, { useState } from "react";
import commonStyles from "../../commonStyles";
import { CaretDown, Globe } from "@phosphor-icons/react";

function SelectInputCountry() {
    const [selectedCountry, setSelectedCountry] = useState("");

    return (
        <div className="group flex flex-col gap-1">
            <label className="font-medium group-focus-within:text-primary">
                Select Country
            </label>

            <div className="relative">
                <div
                    className={`${commonStyles.inputBackground} ${commonStyles.border} h-10 w-full text-sm rounded-md outline-none group-focus-within:border-primary tracking-wide`}
                >
                    <span className="absolute top-1/2 -translate-y-1/2 left-2 group-focus-within:text-primary">
                        <Globe size={24} weight="regular" />
                    </span>

                    <select
                        name=""
                        id=""
                        value={selectedCountry}
                        className={`w-full h-full rounded-md outline-none pl-9 pr-9 appearance-none bg-transparent relative z-20 cursor-pointer group-focus-within:text-gunmetalGray dark:group-focus-within:text-white`}
                        onChange={(event) => {
                            setSelectedCountry(event.target.value);
                        }}
                    >
                        <option
                            value=""
                            disabled
                            className="bg-lightGray dark:bg-gunmetalGray"
                        >
                            Select Country
                        </option>
                        <option
                            value="India"
                            className="bg-lightGray dark:bg-gunmetalGray"
                        >
                            India
                        </option>
                        <option
                            value="United State"
                            className="bg-lightGray dark:bg-gunmetalGray"
                        >
                            United State
                        </option>
                        <option
                            value="United Kingdom"
                            className="bg-lightGray dark:bg-gunmetalGray"
                        >
                            United Kingdom
                        </option>
                        <option
                            value="Russia"
                            className="bg-lightGray dark:bg-gunmetalGray"
                        >
                            Russia
                        </option>
                    </select>

                    <span className="absolute top-1/2 -translate-y-1/2 right-2 group-focus-within:text-primary">
                        <CaretDown size={24} weight="regular" />
                    </span>
                </div>

                {/* <label
                    htmlFor="selectCountryId"
                    className="absolute top-1/2 z-30 -translate-y-1/2 left-4 group-focus-within:text-primary"
                >
                    <Globe size={24} weight="regular" />
                </label>

                <select
                    name=""
                    id="selectCountryId"
                    className={`${commonStyles.inputBackground} ${commonStyles.border} h-10 w-full pl-4 pr-12 text-sm rounded-md outline-none group-focus-within:border-primary text-gunmetalGray dark:text-white tracking-wide appearance-none relative z-20`}
                >
                    <option
                        value=""
                        disabled
                        className="bg-lightGray text-smokyBlack dark:bg-gunmetalGray dark:text-white "
                    >
                        Select Country
                    </option>
                </select>

                <label
                    htmlFor="selectCountryId"
                    className="absolute top-1/2 -translate-y-1/2 z-30 right-4 group-focus-within:text-primary"
                >
                    <CaretDown size={24} weight="regular" />
                </label> */}
            </div>
        </div>
    );
}

export default SelectInputCountry;
