import { useState } from "react";
import type { Lp } from "../../types/lp";

interface LpCardProps {
    lp : Lp;
}

const LpCard = ({lp} : LpCardProps) => {
    const [isHover, setIshover] = useState(false);

    return (
        <>
            <div key={lp.id} className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300" onMouseEnter={():void => setIshover(true)} onMouseLeave={():void=>setIshover(false)}>
              <div className="relative w-full aspect-[4/3] bg-black">
                <img
                  src={lp.thumbnail}
                  alt={lp.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {isHover && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md flex flex-col items-center justify-center p-4">
                        <h2 className='text-m font-bold text-center mt-1 text-white'>{lp.title}</h2>
                        <p className='text-xs mt-1 line-clamp-5 text-gray-300'>{lp.content}</p>
                    </div>
                )} 
              </div>
            </div>
        </>
    )
}

export default LpCard;