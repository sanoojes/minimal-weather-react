interface BtnProps {
    handleClick(): void;
}
const Button = ({ handleClick }: BtnProps) => {
    return (
        <>
            <button
                onClick={handleClick}
                className="flex justify-center items-center h-14 w-14 p-4 rounded-full bg-neutral-50 bg-opacity-70 border-neutral-50 border-opacity-10 hover:bg-neutral-100 hover:bg-opacity-90 transition-colors"
            >
                <img src="images/magnifying-glass.svg" alt="search icon" />
            </button>
        </>
    );
};

export default Button;
