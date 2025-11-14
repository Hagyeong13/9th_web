import { useEffect, useState } from "react";
import useGetLpInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../../enums/common";
import {useInView} from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

export default function HomePage() {
const [search,setSearch]=useState("");
  
  const{data:lps,isFetching,hasNextPage,isPending,fetchNextPage,isError}=useGetLpInfiniteLpList(10,search,PAGINATION_ORDER.DESC);
  const {ref, inView} = useInView({
  threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);


  if (isPending) return <div>로딩…</div>;
  if (isError) return <div>에러</div>;
  return (
    <div className="container mx-auto px-4 py-6">
      <input value={search} onChange={(e)=>setSearch(e.target.value)}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lps?.pages.map((page)=>page.data.data)
          ?.flat()
          ?.map((lp)=>(
            <LpCard key={lp.id} lp={lp}/>
          ))
        }
        <div ref={ref}>
          {isFetching&&(
            <LpCardSkeletonList count={20}/>
          )}
        </div>
      </div>
    </div>
  );
}
