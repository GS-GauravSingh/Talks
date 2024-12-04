import { DownloadSimple } from "@phosphor-icons/react";
import React from "react";

function MediaMessageGrid() {
    const images = [
        {
            key: 0,
            imgSrc: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            key: 1,
            imgSrc: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            key: 3,
            imgSrc: "https://images.unsplash.com/photo-1484136540910-d66bb475348d?q=80&w=1553&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            key: 4,
            imgSrc: "https://images.unsplash.com/photo-1526549928000-f98211febecd?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            key: 5,
            imgSrc: "https://images.unsplash.com/photo-1497564245203-66a1216f073a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ];

    // function to render images based of number of images.
    const renderImages = () => {
        if (images.length === 1) {
            return (
                <div className="relative col-span-2 row-span-2 rounded-lg max-h-52">
                    <img
                        src={images[0].imgSrc}
                        alt=""
                        className="h-full w-full rounded-lg object-cover object-center"
                    />

                    <button className="bg-lightGray/80 text-gunmetalGray rounded-lg p-2 hover:text-primary absolute right-2 top-2">
                        <DownloadSimple size={20} weight="regular" />
                    </button>
                </div>
            );
        } else if (images.length === 2) {
            return images.map((imgObj) => (
                <div
                    key={imgObj.key}
                    className="relative rounded-lg col-span-1 row-span-2 max-h-52"
                >
                    <img
                        src={imgObj.imgSrc}
                        alt=""
                        className="h-full w-full rounded-lg object-cover object-center"
                    />

                    <button className="bg-lightGray/80 text-gunmetalGray rounded-lg p-2 hover:text-primary absolute right-2 top-2">
                        <DownloadSimple size={20} weight="regular" />
                    </button>
                </div>
            ));
        } else if (images.length === 3) {
            return images.map((imgObj, index) => (
                <div
                    key={imgObj.key}
                    className={`relative rounded-lg col-span-1 row-span-1 ${index === 2 && "!col-span-2"} max-h-52`}
                >
                    <img
                        src={imgObj.imgSrc}
                        alt=""
                        className="h-full w-full rounded-lg object-cover object-center"
                    />

                    <button className="bg-lightGray/80 text-gunmetalGray rounded-lg p-2 hover:text-primary absolute right-2 top-2">
                        <DownloadSimple size={20} weight="regular" />
                    </button>
                </div>
            ));
        } else if (images.length === 4) {
            return images.map((imgObj, index) => (
                <div
                    key={imgObj.key}
                    className={`relative rounded-lg col-span-1 row-span-1 max-h-52`}
                >
                    <img
                        src={imgObj.imgSrc}
                        alt=""
                        className="h-full w-full rounded-lg object-cover object-center"
                    />

                    <button className="bg-lightGray/80 text-gunmetalGray rounded-lg p-2 hover:text-primary absolute right-2 top-2">
                        <DownloadSimple size={20} weight="regular" />
                    </button>
                </div>
            ));
        } else {
            // images.length > 4
            return (
                <>
                    {images.slice(0, 3).map((imgObj) => (
                        <div
                            key={imgObj.key}
                            className={`relative rounded-lg col-span-1 row-span-1 max-h-52`}
                        >
                            <img
                                src={imgObj.imgSrc}
                                alt=""
                                className="h-full w-full rounded-lg object-cover object-center"
                            />

                            <button className="bg-lightGray/80 text-gunmetalGray rounded-lg p-2 hover:text-primary absolute right-2 top-2">
                                <DownloadSimple size={20} weight="regular" />
                            </button>
                        </div>
                    ))}

                    <div
                        className={`relative rounded-lg col-span-1 row-span-1 max-h-52`}
                    >
                        <div className="h-full w-full rounded-lg bg-gray/80 flex items-center justify-center text-lg font-medium">
                            <p>+{images.length - 3}</p>
                        </div>

                        <button className="bg-lightGray/80 text-gunmetalGray rounded-lg p-2 hover:text-primary absolute right-2 top-2">
                            <DownloadSimple size={20} weight="regular" />
                        </button>
                    </div>
                </>
            );
        }
    };

    return (
        <div
            className={`grid grid-cols-2 grid-rows-2 px-2 py-2 gap-2 rounded-lg bg-white`}
        >
            {renderImages()}
        </div>
    );
}

export default MediaMessageGrid;
