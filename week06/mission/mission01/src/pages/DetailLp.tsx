import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorPage from "./errorPage";
import type { Lp, ResponseLpDetailDto } from "../types/lp";

const DetailLp = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const [lp, setLp] = useState<Lp | null>(null);
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIserror] = useState(false);

  const id = lpId?.trim();

  useEffect(() => {
    if (!id) return;

    const loadLps = async () => {
      setIsloading(true);
      setIserror(false);

      try {
        const { data } = await axios.get<ResponseLpDetailDto>(
          `http://localhost:8000/v1/lps/${id}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        const lpData = data.data;

        setLp({
          ...lpData,
          ceatedAt: new Date(lpData.ceatedAt),
          updatedAt: new Date(lpData.updatedAt),
        });
      } catch (error) {
        console.error(error);
        setIserror(true);
      } finally {
        setIsloading(false);
      }
    };

    loadLps();
  }, [id]);

  return (
    <>
      {isError && <ErrorPage />}

      {!isError && !isLoading && lp && (
        <div className="relative w-full h-[400px]">
          <img
            src={lp.thumbnail}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex flex-col justify-center h-full px-16 text-white">
            <h1 className="text-3xl font-bold mb-4">{lp.title}</h1>
            <p className="text-base mb-3 max-w-3xl line-clamp-3">
              {lp.content}
            </p>
            <p className="text-sm text-gray-200">
              개봉일: {lp.updatedAt.toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black-500" />
        </div>
      )}
    </>
  );
};


export default DetailLp;