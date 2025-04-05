import Image from 'next/image';
import React from 'react';

const CourseSidebar = () => {
  return (
    <aside className="bg-card flex w-56 flex-col justify-between self-stretch border-r px-7 py-10">
      <div className="space-y-20">
        <Image src={'/logo.svg'} alt="logo" width={71} height={21} />
      </div>
    </aside>
  );
};

export default CourseSidebar;
