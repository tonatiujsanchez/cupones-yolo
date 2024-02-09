import { FC } from "react"
import { BLACK_COLOR, PRIMARY_COLOR } from "@/constants"


interface IconProps {
    fill?       : string
    stroke?     : string
    strokeWidth?: number
}

export const FacebookIcon: FC<IconProps> = ({ fill = PRIMARY_COLOR }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="25" height="25"
            fill={ fill }
        >
            <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
        </svg>
    )
}

export const InstagramIcon: FC<IconProps> = ({ fill = PRIMARY_COLOR }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="25" height="25" 
            fill={ fill }
        >
            <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z" />
            <circle cx="16.806" cy="7.207" r="1.078"></circle>
            <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z" />
        </svg>
    )
}

export const WhatsAppIcon: FC<IconProps> = ({ fill = PRIMARY_COLOR }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="25" height="25" 
            fill={ fill }
        >
            <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"
            />
        </svg>
    )
}

export const MunuIcon: FC<IconProps> = ({ fill = BLACK_COLOR, stroke='currentColor', strokeWidth = 1.6 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 23 20"
            width={34} height={28} 
            fill={ fill }
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
        </svg>
    )
}

export const XIcon: FC<IconProps> = ({ fill = BLACK_COLOR, stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width={6} height={6}
            fill={ fill }
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    )
}

export const CheckIcon: FC<IconProps> = ({ fill = 'currentColor', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="100%" 
            height="100%" 
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
                <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
        </svg>
    )
}

export const CheckCircleIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="100%" 
            height="100%" 
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
    )
}

export const ArrowRightIcon: FC<IconProps> = ({ fill = BLACK_COLOR, stroke = 'currentColor', strokeWidth=1.6 }) => {
    return (
        <svg
            width="100%"
            height="100%" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 30 24"
            fill={ fill }
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
        </svg>
    )
}

export const ArrowLeftIcon: FC<IconProps> = ({ fill = BLACK_COLOR, stroke = 'currentColor', strokeWidth=1.6 }) => {
    return (
        <svg 
            width="100%"
            height="100%" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 30 24"
            fill={ fill }
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
        </svg>
      
    )
}

export const ArrowDownIcon: FC<IconProps> = ({ fill = BLACK_COLOR, stroke = 'currentColor', strokeWidth=1.6 }) => {
    return (
        <svg 
            width="100%"
            height="100%" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 30 24"
            fill={ fill }
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
        </svg>
      
    )
}

export const ShoppingBagIcon: FC<IconProps> = ({ fill = BLACK_COLOR, stroke = 'none', strokeWidth = 1.5 }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill={ fill }
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
    )
}

export const GiftIcon: FC<IconProps> = ({ fill = 'none', stroke = BLACK_COLOR, strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24" 
            fill={ fill }
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
    )
}


export const GiftSolidIcon: FC<IconProps> = ({ fill = BLACK_COLOR, stroke = 'none', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="96" 
            height="96" 
            viewBox="0 0 24 24"
            fill={ fill }
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path d="M5 12H4v8a2 2 0 0 0 2 2h5V12H5zm13 0h-5v10h5a2 2 0 0 0 2-2v-8h-2zm.791-5A4.92 4.92 0 0 0 19 5.5C19 3.57 17.43 2 15.5 2c-1.622 0-2.705 1.482-3.404 3.085C11.407 3.57 10.269 2 8.5 2 6.57 2 5 3.57 5 5.5c0 .596.079 1.089.209 1.5H2v4h9V9h2v2h9V7h-3.209zM7 5.5C7 4.673 7.673 4 8.5 4c.888 0 1.714 1.525 2.198 3H8c-.374 0-1 0-1-1.5zM15.5 4c.827 0 1.5.673 1.5 1.5C17 7 16.374 7 16 7h-2.477c.51-1.576 1.251-3 1.977-3z" />
        </svg>
    )
}

export const CouponIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 0.5 }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path d="M21 5H3a1 1 0 00-1 1v4h.893c.996 0 1.92.681 2.08 1.664A2.001 2.001 0 013 14H2v4a1 1 0 001 1h18a1 1 0 001-1v-4h-1a2.001 2.001 0 01-1.973-2.336c.16-.983 1.084-1.664 2.08-1.664H22V6a1 1 0 00-1-1zM11 17H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V7h2v2z" />
        </svg>
    )
}

export const PercentIcon: FC<IconProps> = ({ fill = BLACK_COLOR, stroke = 'none', strokeWidth = 2.2 }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth } 
        >
            <line x1="19" y1="5" x2="5" y2="19"></line>
            <circle cx="6.5" cy="6.5" r="2.5"></circle>
            <circle cx="17.5" cy="17.5" r="2.5"></circle>
        </svg>
    )
}

export const ShoppingCartIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill={ fill }
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
    )
}

export const StarIcon: FC<IconProps> = ({ fill = BLACK_COLOR, stroke = 'none' }) => {
    return (
        <svg 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 784.11 815.53" 
            version="1.1" xmlSpace="preserve" 
            fill={ fill }
            stroke={ stroke } 
        >
            <defs></defs>
            <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
            </g>
        </svg>
    )
}

export const CakeIcon: FC<IconProps> = ({ fill = BLACK_COLOR, stroke = 'none', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill={ fill }
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z"
            />
        </svg>
    )
}

export const UserIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
        </svg>
    )
}

export const UserGroupIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            />
        </svg>
    )
}

export const UserCircleIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
        </svg>      
    )
}

export const LogoutIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />

        </svg>
    )
}

export const HeartIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
        </svg>
    )
}

export const PackageIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
            <path 
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
            />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>

        </svg>
    )
}

export const BuildingIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
            />
        </svg>
    )
}

export const TruckIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" 
            />
        </svg>
    )
}

export const ShirtIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"
            />
        </svg>
    )
}

export const SettingsIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
        </svg>
    )
}

export const ChevronLeftIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
            />
        </svg>
    )
}

export const ChevronRightIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
        </svg>
    )
}

export const MinusIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M19.5 12h-15"
            />
        </svg>
    )
}

export const ClockIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    )
}

export const SearchIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />

        </svg>
    )
}

export const LayerIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
    )
}

export const ShieldIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill={ fill }
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={36}
                d="M463.1 112.37C373.68 96.33 336.71 84.45 256 48c-80.71 36.45-117.68 48.33-207.1 64.37C32.7 369.13 240.58 457.79 256 464c15.42-6.21 223.3-94.87 207.1-351.63z"
            />
        </svg>
    )
}

export const ArchiveBoxArrowDownIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
        </svg>
    )
}

export const AlertCircleIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
        </svg>
    )
}

export const PlusCircleIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
            />                
        </svg>
    )
}

export const EllipsisVerticalIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
        </svg>
    )
}

export const EditIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
        </svg>
    )
}

export const TrashIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
    )
}

export const ExclamationTriangleIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
    )
}

export const GoogleIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            x="0px" y="0px" 
            width="24" height="24" 
            viewBox="0 0 48 48"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                fill="#fbc02d" 
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z">
            </path>
            <path 
                fill="#e53935" 
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z">
            </path>
            <path 
                fill="#4caf50" 
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z">
            </path>
            <path 
                fill="#1565c0" 
                d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z">
            </path>
        </svg>
    )
}

export const CogIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            x="0px" y="0px" 
            viewBox="0 0 22 22"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <path 
                strokeLinecap="round"
                strokeLinejoin="round" 
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
            />
            <path 
                strokeLinecap="round"
                strokeLinejoin="round" 
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
        </svg>
    )
}

export const UploadCloudIcon: FC<IconProps> = ({ fill = 'none', stroke = 'currentColor', strokeWidth = 1.5 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24"
            fill={ fill } 
            stroke={ stroke }
            strokeWidth={ strokeWidth }
        >
            <polyline points="16 16 12 12 8 16"></polyline>
            <line x1="12" y1="12" x2="12" y2="21"></line>
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
            <polyline points="16 16 12 12 8 16"></polyline>
        </svg>
    )
}
