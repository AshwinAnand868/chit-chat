'use client'

import { useParams } from "next/navigation";

const Page = () => {
    const { id } = useParams();
  
    return (
      <div>Meeting id: {id}</div>
    )
  };
  
  export default Page;