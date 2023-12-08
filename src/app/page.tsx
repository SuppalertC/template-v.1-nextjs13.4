'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from './loading';

export default function UnaiHome() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      <section>
        {/* <div className="flex h-[100vh] w-[100vw] ">
          <div className="flex flex-col justify-center items-center z-20 w-full h-full">
            <Card className="w-[420px] ">
              <div className="flex-col flex justify-center items-center">
                <Image alt="icon" src={'/static/logo/640px-TUHospital.jpeg'} width={72} height={72}></Image>
                <span className="text-[16px] text-font-color-primary font-bold">โรงพยาบาลธรรมศาสตร์เฉลิมพระเกียรติ</span>
                <span className="text-[14px] font-thin">Thammasat University Hospital</span>
              </div>
              <LoginFeature />
              <span className="text-[10px] text-[#7b7b7b] flex justify-center items-center">
                Copyright © 2023-2024 Thammasat University Hospital. All rights reserved.
              </span>
            </Card>
          </div>
          <div className="absolute bg-hero-pattern  bg-cover h-[100vh] w-[100vw]  bg-black/54 opacity-[1] brightness-50"></div>
        </div> */}
        <div className="text-lg flex w-full h-[500px] justify-center items-center"> {'Lets Start new Project'}</div>
      </section>
    </main>
  );
}
