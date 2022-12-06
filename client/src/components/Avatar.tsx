import AvatarModule from "boring-avatars";

interface propsType {
   variant: any;
   name: string;
   size: number;
   src: null | string | undefined;
}

export default function Avatar({ variant, name, size, src }: propsType) {
   return (
      <div className='rounded-full overflow-hidden'>
         {src ? (
            <img
               style={{ width: size, height: size }}
               className='object-cover rounded-full'
               src={src}
               alt='img not found'
            />
         ) : (
            <AvatarModule variant={variant} name={name} size={size} />
         )}
      </div>
   );
}
