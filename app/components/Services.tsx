import React from 'react'
import Image from 'next/image'
function Services() {
    const myServices=[
        {id: 1,name: "sup",image:"/next.svg", discription:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eligendi soluta est veniam sequi nemo.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eligendi soluta est veniam sequi nemo.",},
          {id:2 ,name: "npme",image:"/next.svg", discription:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eligendi soluta est veniam sequi nemo.",},
            {id: 3,name: "wg",image:"/next.svg", discription:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eligendi soluta est veniam sequi nemo.",},
              {id:4 ,name: "rge",image:"/next.svg", discription:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eligendi soluta est veniam sequi nemo.",}
    ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-20 py-30">
      {myServices.map((cat) => (
       <div
  key={cat.id}
  className="
    group bg-black p-6 
    relative
    transform  hover:scale-105
   group rounded-3xl shadow-lg shadow-blue-800 
            transition-all duration-500 ease-linear overflow-hidden
            before:w-full before:h-full before:bg-blue-800
            hover:before:left-0
    before:content-[''] before:absolute before:top-0 before:-left-full
    before:transition-all before:duration-500 before:z-0
    group-hover:before:left-0
  "
>
  <Image
    src={cat.image}
    alt={cat.name}
    height={60}
    width={60}
    className="mb-4 relative z-1"
  />

  <h3 className="text-cyan-400 mt-2 text-lg font-bold transition-colors duration-500 relative z-1 group-hover:text-white sm:text">
    {cat.name}
  </h3>

  <p className="text-gray-400 text-sm mt-2 leading-relaxed transition-colors duration-500 relative z-1 group-hover:text-gray-100">
    {cat.discription}
  </p>
</div>
      ))}
    </div>
  );
}

export default Services
