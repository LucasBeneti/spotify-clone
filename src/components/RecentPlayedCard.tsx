interface RecentPlayedCardProps {
    name: string;
    imgSrc: string;
}
export const RecentPlayedCard = ({ name, imgSrc }: RecentPlayedCardProps) => {
    return (
        <div className='flex rounded-lg bg-highlight w-4/12 m-2'>
            <img className='w-20 h-auto' src={imgSrc} alt='' />
            <h2 className='text-2xl font-bold'>{name}</h2>
        </div>
    );
};
