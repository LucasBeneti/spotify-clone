type SVGIconProp = {
    stroke?: string;
    fill?: string;
    size?: number;
    className?: string;
};

export const MicIcon = ({ stroke = '#fff', className }: SVGIconProp) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            role='img'
            height='16'
            width='16'
            aria-hidden='true'
            viewBox='0 0 16 16'
            data-encore-id='icon'
            className={className}
        >
            <path
                fill={stroke}
                d='M13.426 2.574a2.831 2.831 0 0 0-4.797 1.55l3.247 3.247a2.831 2.831 0 0 0 1.55-4.797zM10.5 8.118l-2.619-2.62A63303.13 63303.13 0 0 0 4.74 9.075L2.065 12.12a1.287 1.287 0 0 0 1.816 1.816l3.06-2.688 3.56-3.129zM7.12 4.094a4.331 4.331 0 1 1 4.786 4.786l-3.974 3.493-3.06 2.689a2.787 2.787 0 0 1-3.933-3.933l2.676-3.045 3.505-3.99z'
            />
        </svg>
    );
};
