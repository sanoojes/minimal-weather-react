interface CardProps {
    mainTxt: string;
    desc: string;
    pathToImg: string;
    imgAlt?: string;
}

const Card = ({ mainTxt, desc, pathToImg, imgAlt }: CardProps) => {
    return (
        <div className="flex max-sm:flex-col max-sm:text-center justify-around items-center w-full gap-2 bg-neutral-50 bg-opacity-40 px-2 py-4 border-4 border-neutral-50 border-opacity-10 shadow-sm rounded-2xl">
            <img className="brightness-0" src={pathToImg} alt={imgAlt} />
            <div className="flex flex-col">
                <span className="text-3xl text-neutral-950 font-bold">
                    {mainTxt}
                </span>
                <span className="text-xl text-neutral-950 font-semibold">
                    {desc}
                </span>
            </div>
        </div>
    );
};

export default Card;
